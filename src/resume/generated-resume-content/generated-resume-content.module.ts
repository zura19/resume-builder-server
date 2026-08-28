import { Module } from '@nestjs/common';
import { GeneratedResumeContentService } from './generated-resume-content.service';

@Module({
  providers: [GeneratedResumeContentService],
  exports: [GeneratedResumeContentService],
})
export class GeneratedResumeContentModule {}
