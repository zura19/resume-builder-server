import { Injectable, NotFoundException } from '@nestjs/common';
import { DbService } from 'src/db/db.service';

@Injectable()
export class GeneratedResumeContentService {
  constructor(private readonly db: DbService) {}

  async assertOwnership(generatedResumeId: string, userId: string) {
    const generatedResume = await this.db.generatedResume.findFirst({
      where: { id: generatedResumeId, resume: { userId } },
      select: { id: true },
    });

    if (!generatedResume) {
      throw new NotFoundException('Generated resume not found or not owned by user.');
    }
  }
}
