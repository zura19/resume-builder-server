import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { User } from '@prisma/client';
import { UserDecorator } from 'src/common/decorators/user.decorator';
import { PersonalInfoDto } from '../dto/personal-info.dto';
import { PersonalInfoService } from './personal-info.service';

@UseGuards(AuthGuard('jwt'))
@Controller('generated-resumes/:generatedResumeId/personal-info')
export class PersonalInfoController {
  constructor(private readonly personalInfoService: PersonalInfoService) {}

  @Patch()
  update(
    @Param('generatedResumeId') generatedResumeId: string,
    @Body() body: PersonalInfoDto,
    @UserDecorator() user: User,
  ) {
    return this.personalInfoService.update(generatedResumeId, body, user.id);
  }
}
