import { Module } from '@nestjs/common';
import { GeneratedResumeContentModule } from '../generated-resume-content/generated-resume-content.module';
import { SummaryController } from './summary.controller';
import { SummaryService } from './summary.service';

@Module({
  imports: [GeneratedResumeContentModule],
  controllers: [SummaryController],
  providers: [SummaryService],
})
export class SummaryModule {}
