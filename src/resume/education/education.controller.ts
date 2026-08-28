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
import { GeneratedEducationDto } from '../dto/generated-resume/generated-education.dto';
import { ReorderDto } from '../dto/reorder.dto';
import { EducationService } from './education.service';

@UseGuards(AuthGuard('jwt'))
@Controller('generated-resumes/:generatedResumeId/education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Post()
  create(
    @Param('generatedResumeId') generatedResumeId: string,
    @Body() body: GeneratedEducationDto,
    @UserDecorator() user: User,
  ) {
    return this.educationService.create(generatedResumeId, body, user.id);
  }

  @Patch('reorder/:id')
  reorder(
    @Param('generatedResumeId') generatedResumeId: string,
    @Param('id') id: string,
    @Body() body: ReorderDto,
    @UserDecorator() user: User,
  ) {
    return this.educationService.reorder(generatedResumeId, id, body, user.id);
  }

  @Patch(':id')
  update(
    @Param('generatedResumeId') generatedResumeId: string,
    @Param('id') id: string,
    @Body() body: GeneratedEducationDto,
    @UserDecorator() user: User,
  ) {
    return this.educationService.update(generatedResumeId, id, body, user.id);
  }

  @Delete(':id')
  remove(
    @Param('generatedResumeId') generatedResumeId: string,
    @Param('id') id: string,
    @UserDecorator() user: User,
  ) {
    return this.educationService.remove(generatedResumeId, id, user.id);
  }
}
