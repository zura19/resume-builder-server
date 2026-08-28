import { Module } from '@nestjs/common';
import { GeneratedResumeContentModule } from '../generated-resume-content/generated-resume-content.module';
import { SkillsController } from './skills.controller';
import { SkillsService } from './skills.service';

@Module({
  imports: [GeneratedResumeContentModule],
  controllers: [SkillsController],
  providers: [SkillsService],
})
export class SkillsModule {}
