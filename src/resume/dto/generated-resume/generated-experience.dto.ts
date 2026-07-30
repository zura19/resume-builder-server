import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class GeneratedExperienceDto {
  @IsString()
  @IsNotEmpty()
  company: string;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/, {
    message: 'startDate must use the YYYY/MM/DD format.',
  })
  startDate: string;

  @IsString()
  // @Matches(/^\d{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/, {
  //   message: 'endDate must use the YYYY/MM/DD format.',
  // })
  @IsOptional()
  endDate?: string | null;

  @IsOptional()
  @IsBoolean()
  stillWorking?: boolean;

  @IsArray()
  @IsString({ each: true })
  @IsOptional({ each: true })
  responsibilities: string[];
}
