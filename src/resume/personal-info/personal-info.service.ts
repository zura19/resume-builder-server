import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { PersonalInfoDto } from '../dto/personal-info.dto';
import { GeneratedResumeContentService } from '../generated-resume-content/generated-resume-content.service';

@Injectable()
export class PersonalInfoService {
  constructor(
    private readonly db: DbService,
    private readonly generatedResumeContent: GeneratedResumeContentService,
  ) {}

  async update(generatedResumeId: string, data: PersonalInfoDto, userId: string) {
    await this.generatedResumeContent.assertOwnership(generatedResumeId, userId);
    return this.db.personalInfo.upsert({
      where: { generatedResumeId },
      create: { generatedResumeId, ...data },
      update: data,
    });
  }
}
