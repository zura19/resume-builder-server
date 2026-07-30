import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { GeneratedEducationDto } from '../dto/generated-resume/generated-education.dto';
import { ReorderDto } from '../dto/reorder.dto';
import { GeneratedResumeContentService } from '../generated-resume-content/generated-resume-content.service';

@Injectable()
export class EducationService {
  constructor(
    private readonly db: DbService,
    private readonly generatedResumeContent: GeneratedResumeContentService,
  ) {}

  private data(data: GeneratedEducationDto, order?: number) {
    return {
      university: data.university,
      degree: data.degree,
      fieldOfStudy: data.fieldOfStudy,
      startDate: data.startDate,
      endDate: data.endDate ?? '',
      ...(order === undefined ? {} : { order }),
    };
  }

  async create(
    generatedResumeId: string,
    data: GeneratedEducationDto,
    userId: string,
  ) {
    await this.generatedResumeContent.assertOwnership(
      generatedResumeId,
      userId,
    );
    const count = await this.db.education.count({
      where: { generatedResumeId },
    });
    return this.db.education.create({
      data: { generatedResumeId, ...this.data(data, count) },
    });
  }

  async update(
    generatedResumeId: string,
    id: string,
    data: GeneratedEducationDto,
    userId: string,
  ) {
    await this.generatedResumeContent.assertOwnership(
      generatedResumeId,
      userId,
    );
    const result = await this.db.education.updateMany({
      where: { id, generatedResumeId },
      data: this.data(data),
    });
    if (!result.count) throw new NotFoundException('Education not found.');

    return {
      message: 'Education updated successfully',
    };
  }

  async remove(generatedResumeId: string, id: string, userId: string) {
    await this.generatedResumeContent.assertOwnership(
      generatedResumeId,
      userId,
    );
    const result = await this.db.education.deleteMany({
      where: { id, generatedResumeId },
    });
    if (!result.count) throw new NotFoundException('Education not found.');

    return {
      message: 'Education deleted successfully',
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
      const items = await tx.education.findMany({
        where: { generatedResumeId },
        orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
      });
      const currentIndex = items.findIndex((item) => item.id === id);
      if (currentIndex === -1)
        throw new NotFoundException('Education not found.');

      const [item] = items.splice(currentIndex, 1);
      const order = Math.max(0, Math.min(data.order, items.length));
      items.splice(order, 0, item);
      await Promise.all(
        items.map((entry, index) =>
          tx.education.update({
            where: { id: entry.id },
            data: { order: index },
          }),
        ),
      );
      return { id, order };
    });
  }
}
