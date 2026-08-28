import { Module } from '@nestjs/common';
import { GeneratedResumeContentModule } from '../generated-resume-content/generated-resume-content.module';
import { EducationController } from './education.controller';
import { EducationService } from './education.service';

@Module({ imports: [GeneratedResumeContentModule], controllers: [EducationController], providers: [EducationService] })
export class EducationModule {}
