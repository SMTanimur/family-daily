import { PaginationArgs, SortOrder } from '@family-daily/common';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';

import { Category } from '../schemas';


export enum QueryCategoriesOrderByColumn {
  CREATED_AT = 'createdAt',
  NAME = 'name',
  UPDATED_AT = 'updatedAt',
}

export class GetCategoriesDto extends PaginationArgs {
  @IsEnum(QueryCategoriesOrderByColumn)
  @ApiPropertyOptional({ enum: QueryCategoriesOrderByColumn })
  @IsOptional()
  orderBy?: QueryCategoriesOrderByColumn =
    QueryCategoriesOrderByColumn.CREATED_AT;
    
  @IsEnum(SortOrder)
  @ApiPropertyOptional({ enum: SortOrder })
  @IsOptional()
  sortedBy?: SortOrder = SortOrder.DESC;

  @IsMongoId()
  @ApiPropertyOptional()
  @IsOptional()
  type?: string;

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  search?: string;
  
  @IsMongoId()
  @ApiPropertyOptional()
  @IsOptional()
  parent?: number = null;
}
