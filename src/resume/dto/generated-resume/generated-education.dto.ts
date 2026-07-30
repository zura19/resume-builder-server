// dto/education.dto.ts
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class GeneratedEducationDto {
  @IsString()
  @IsNotEmpty()
  university: string;

  @IsString()
  @IsOptional()
  degree?: string;

  @IsString()
  @IsNotEmpty()
  fieldOfStudy: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{4}\/(0[1-9]|1[0-2])$/, {
    message: 'startDate must use the YYYY/MM format.',
  })
  startDate: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{4}\/(0[1-9]|1[0-2])$/, {
    message: 'endDate must use the YYYY/MM format.',
  })
  endDate?: string;

  @IsOptional()
  @IsBoolean()
  stillStudying?: boolean;
}
