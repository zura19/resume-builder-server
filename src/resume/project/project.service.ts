import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { GeneratedProjectDto } from '../dto/generated-resume/generated-projects.dto';
import { ReorderDto } from '../dto/reorder.dto';
import { GeneratedResumeContentService } from '../generated-resume-content/generated-resume-content.service';

@Injectable()
export class ProjectService {
  constructor(
    private readonly db: DbService,
    private readonly generatedResumeContent: GeneratedResumeContentService,
  ) {}
  private data(data: GeneratedProjectDto, order?: number) {
    return {
      title: data.title,
      technologies: data.technologies,
      features: data.features,
      ...(order === undefined ? {} : { order }),
    };
  }
  async create(
    generatedResumeId: string,
    data: GeneratedProjectDto,
    userId: string,
  ) {
    await this.generatedResumeContent.assertOwnership(
      generatedResumeId,
      userId,
    );
    const order = await this.db.project.count({ where: { generatedResumeId } });
    return this.db.project.create({
      data: { generatedResumeId, ...this.data(data, order) },
    });
  }
  async update(
    generatedResumeId: string,
    id: string,
    data: GeneratedProjectDto,
    userId: string,
  ) {
    await this.generatedResumeContent.assertOwnership(
      generatedResumeId,
      userId,
    );
    const result = await this.db.project.updateMany({
      where: { id, generatedResumeId },
      data: this.data(data),
    });
    if (!result.count) throw new NotFoundException('Project not found.');
  }
  async remove(generatedResumeId: string, id: string, userId: string) {
    await this.generatedResumeContent.assertOwnership(
      generatedResumeId,
      userId,
    );
    const result = await this.db.project.deleteMany({
      where: { id, generatedResumeId },
    });
    if (!result.count) throw new NotFoundException('Project not found.');
  }
  async reorder(
    generatedResumeId: string,
    id: string,
    data: ReorderDto,
    userId: string,
  ) {
    await this.generatedResumeContent.assertOwnership(
      generatedResumeId,
      userId,
    );
    return this.db.$transaction(async (tx) => {
      const items = await tx.project.findMany({
        where: { generatedResumeId },
        orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
      });
      const currentIndex = items.findIndex((item) => item.id === id);
      if (currentIndex === -1)
        throw new NotFoundException('Project not found.');

      const [item] = items.splice(currentIndex, 1);
      const order = Math.max(0, Math.min(data.order, items.length));
      items.splice(order, 0, item);
      await Promise.all(
        items.map((entry, index) =>
          tx.project.update({
            where: { id: entry.id },
            data: { order: index },
          }),
        ),
      );
      return { id, order };
    });
  }
}
