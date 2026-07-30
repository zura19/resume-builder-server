import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { User } from '@prisma/client';
import { UserDecorator } from 'src/common/decorators/user.decorator';
import { SkillsDto } from '../dto/skills.dto';
import { SkillsService } from './skills.service';

@UseGuards(AuthGuard('jwt'))
@Controller('generated-resumes/:generatedResumeId/skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Patch()
  update(
    @Param('generatedResumeId') generatedResumeId: string,
    @Body() body: SkillsDto,
    @UserDecorator() user: User,
  ) {
    return this.skillsService.update(generatedResumeId, body, user.id);
  }
}
