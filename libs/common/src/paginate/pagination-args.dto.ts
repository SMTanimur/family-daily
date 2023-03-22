import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class PaginationArgs {
  @ApiPropertyOptional()
  @IsOptional()
  @Transform((val) => parseInt(val.value))
  public limit?: number = 10;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform((val) => parseInt(val.value))
  public page?: number = 1;
}
