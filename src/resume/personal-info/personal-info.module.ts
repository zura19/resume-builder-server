import { Module } from '@nestjs/common';
import { GeneratedResumeContentModule } from '../generated-resume-content/generated-resume-content.module';
import { PersonalInfoController } from './personal-info.controller';
import { PersonalInfoService } from './personal-info.service';

@Module({
  imports: [GeneratedResumeContentModule],
  controllers: [PersonalInfoController],
  providers: [PersonalInfoService],
})
export class PersonalInfoModule {}
