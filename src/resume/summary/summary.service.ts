import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { GeneratedResumeContentService } from '../generated-resume-content/generated-resume-content.service';

@Injectable()
export class SummaryService {
  constructor(
    private readonly db: DbService,
    private readonly generatedResumeContent: GeneratedResumeContentService,
  ) {}

  async update(
    generatedResumeId: string,
    summary: string | null,
    userId: string,
  ) {
    await this.generatedResumeContent.assertOwnership(
      generatedResumeId,
      userId,
    );
    return this.db.generatedResume.update({
      where: { id: generatedResumeId },
      data: { summary: summary ?? '' },
      select: { id: true, summary: true },
    });
  }
}
