import { Module } from '@nestjs/common';
import { GeneratedResumeContentModule } from '../generated-resume-content/generated-resume-content.module';
import { ExperienceController } from './experience.controller';
import { ExperienceService } from './experience.service';

@Module({ imports: [GeneratedResumeContentModule], controllers: [ExperienceController], providers: [ExperienceService] })
export class ExperienceModule {}
