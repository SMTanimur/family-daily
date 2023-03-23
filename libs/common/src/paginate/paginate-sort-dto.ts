import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginateDto {
  @IsNotEmpty()
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  skip?: number;

  @IsNotEmpty()
  @ApiPropertyOptional({type:Number})
  @IsOptional()
  limit?: number

  @ApiPropertyOptional()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  slug?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  keyword?: string;
}


export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}