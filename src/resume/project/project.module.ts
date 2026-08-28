import { Module } from '@nestjs/common';
import { GeneratedResumeContentModule } from '../generated-resume-content/generated-resume-content.module';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({ imports: [GeneratedResumeContentModule], controllers: [ProjectController], providers: [ProjectService] })
export class ProjectModule {}
