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
  @Matches(/^\d{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/, {
    message: 'startDate must use the YYYY/MM/DD format.',
  })
  startDate: string;

  @IsOptional()
  @IsString()
  // @Matches(/^\d{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/, {
  //   message: 'endDate must use the YYYY/MM/DD format.',
  // })
  endDate?: string | null;

  @IsOptional()
  @IsBoolean()
  stillStudying?: boolean;
}
