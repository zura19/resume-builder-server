import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GeneratedProjectDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  //   @IsString()
  //   @IsNotEmpty()
  //   description: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional({ each: true })
  features: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional({ each: true })
  technologies: string[];
}
