// dto/skills.dto.ts
import { IsArray, IsOptional, IsString } from 'class-validator';

export class SkillsDto {
  @IsArray()
  @IsString({ each: true })
  @IsOptional({ each: true })
  soft: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional({ each: true })
  languages: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional({ each: true })
  technical: string[];
}
