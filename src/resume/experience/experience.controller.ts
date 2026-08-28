import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { User } from '@prisma/client';
import { UserDecorator } from 'src/common/decorators/user.decorator';
import { GeneratedExperienceDto } from '../dto/generated-resume/generated-experience.dto';
import { ReorderDto } from '../dto/reorder.dto';
import { ExperienceService } from './experience.service';

@UseGuards(AuthGuard('jwt'))
@Controller('generated-resumes/:generatedResumeId/experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}
  @Post() create(
    @Param('generatedResumeId') generatedResumeId: string,
    @Body() body: GeneratedExperienceDto,
    @UserDecorator() user: User,
  ) {
    return this.experienceService.create(generatedResumeId, body, user.id);
  }
  @Patch('reorder/:id') reorder(
    @Param('generatedResumeId') generatedResumeId: string,
    @Param('id') id: string,
    @Body() body: ReorderDto,
    @UserDecorator() user: User,
  ) {
    return this.experienceService.reorder(generatedResumeId, id, body, user.id);
  }
  @Patch(':id') update(
    @Param('generatedResumeId') generatedResumeId: string,
    @Param('id') id: string,
    @Body() body: GeneratedExperienceDto,
    @UserDecorator() user: User,
  ) {
    return this.experienceService.update(generatedResumeId, id, body, user.id);
  }
  @Delete(':id') remove(
    @Param('generatedResumeId') generatedResumeId: string,
    @Param('id') id: string,
    @UserDecorator() user: User,
  ) {
    return this.experienceService.remove(generatedResumeId, id, user.id);
  }
}
