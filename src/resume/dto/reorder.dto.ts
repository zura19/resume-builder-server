import { IsInt } from 'class-validator';

export class ReorderDto {
  @IsInt()
  order: number;
}
