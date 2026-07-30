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
import { GeneratedProjectDto } from '../dto/generated-resume/generated-projects.dto';
import { ReorderDto } from '../dto/reorder.dto';
import { ProjectService } from './project.service';

@UseGuards(AuthGuard('jwt'))
@Controller('generated-resumes/:generatedResumeId/projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
  @Post() create(
    @Param('generatedResumeId') generatedResumeId: string,
    @Body() body: GeneratedProjectDto,
    @UserDecorator() user: User,
  ) {
    return this.projectService.create(generatedResumeId, body, user.id);
  }
  @Patch('reorder/:id') reorder(
    @Param('generatedResumeId') generatedResumeId: string,
    @Param('id') id: string,
    @Body() body: ReorderDto,
    @UserDecorator() user: User,
  ) {
    return this.projectService.reorder(generatedResumeId, id, body, user.id);
  }
  @Patch(':id') update(
    @Param('generatedResumeId') generatedResumeId: string,
    @Param('id') id: string,
    @Body() body: GeneratedProjectDto,
    @UserDecorator() user: User,
  ) {
    return this.projectService.update(generatedResumeId, id, body, user.id);
  }
  @Delete(':id') remove(
    @Param('generatedResumeId') generatedResumeId: string,
    @Param('id') id: string,
    @UserDecorator() user: User,
  ) {
    return this.projectService.remove(generatedResumeId, id, user.id);
  }
}
