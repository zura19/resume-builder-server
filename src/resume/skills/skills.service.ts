import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { SkillsDto } from '../dto/skills.dto';
import { GeneratedResumeContentService } from '../generated-resume-content/generated-resume-content.service';

@Injectable()
export class SkillsService {
  constructor(
    private readonly db: DbService,
    private readonly generatedResumeContent: GeneratedResumeContentService,
  ) {}

  async update(generatedResumeId: string, data: SkillsDto, userId: string) {
    await this.generatedResumeContent.assertOwnership(generatedResumeId, userId);
    return this.db.skills.upsert({
      where: { generatedResumeId },
      create: { generatedResumeId, ...data },
      update: data,
    });
  }
}
