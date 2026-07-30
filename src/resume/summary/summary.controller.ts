import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IsOptional, IsString } from 'class-validator';
import { UserDecorator } from 'src/common/decorators/user.decorator';
import type { User } from '@prisma/client';
import { SummaryService } from './summary.service';

class UpdateSummaryDto {
  @IsString()
  @IsOptional()
  summary?: string;
}

@UseGuards(AuthGuard('jwt'))
@Controller('generated-resumes/:generatedResumeId/summary')
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}

  @Patch()
  update(
    @Param('generatedResumeId') generatedResumeId: string,
    @Body() body: UpdateSummaryDto,
    @UserDecorator() user: User,
  ) {
    return this.summaryService.update(
      generatedResumeId,
      body.summary ?? null,
      user.id,
    );
  }
}
