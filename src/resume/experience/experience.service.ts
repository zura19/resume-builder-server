import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { GeneratedExperienceDto } from '../dto/generated-resume/generated-experience.dto';
import { ReorderDto } from '../dto/reorder.dto';
import { GeneratedResumeContentService } from '../generated-resume-content/generated-resume-content.service';

@Injectable()
export class ExperienceService {
  constructor(
    private readonly db: DbService,
    private readonly generatedResumeContent: GeneratedResumeContentService,
  ) {}

  private data(data: GeneratedExperienceDto, order?: number) {
    return {
      company: data.company,
      position: data.position,
      startDate: data.startDate,
      endDate: data.endDate ?? '',
      responsibilities: data.responsibilities,
      ...(order === undefined ? {} : { order }),
    };
  }

  async create(
    generatedResumeId: string,
    data: GeneratedExperienceDto,
    userId: string,
  ) {
    await this.generatedResumeContent.assertOwnership(
      generatedResumeId,
      userId,
    );
    const order = await this.db.experience.count({
      where: { generatedResumeId },
    });
    return this.db.experience.create({
      data: { generatedResumeId, ...this.data(data, order) },
    });
  }

  async update(
    generatedResumeId: string,
    id: string,
    data: GeneratedExperienceDto,
    userId: string,
  ) {
    await this.generatedResumeContent.assertOwnership(
      generatedResumeId,
      userId,
    );
    const result = await this.db.experience.updateMany({
      where: { id, generatedResumeId },
      data: this.data(data),
    });
    if (!result.count) throw new NotFoundException('Experience not found.');

    return {
      message: 'Experience updated successfully',
    };
  }

  async remove(generatedResumeId: string, id: string, userId: string) {
    await this.generatedResumeContent.assertOwnership(
      generatedResumeId,
      userId,
    );
    const result = await this.db.experience.deleteMany({
      where: { id, generatedResumeId },
    });
    if (!result.count) throw new NotFoundException('Experience not found.');

    return {
      message: 'Experience deleted successfully',
    };
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
      const items = await tx.experience.findMany({
        where: { generatedResumeId },
        orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
      });
      const currentIndex = items.findIndex((item) => item.id === id);
      if (currentIndex === -1)
        throw new NotFoundException('Experience not found.');

      const [item] = items.splice(currentIndex, 1);
      const order = Math.max(0, Math.min(data.order, items.length));
      items.splice(order, 0, item);
      await Promise.all(
        items.map((entry, index) =>
          tx.experience.update({
            where: { id: entry.id },
            data: { order: index },
          }),
        ),
      );
      return { id, order };
    });
  }
}
