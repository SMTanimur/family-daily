import { PaginationArgs, SortOrder } from '@family-daily/common';
import { ApiPropertyOptional } from '@nestjs/swagger';

import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum QueryAttributesOrderByColumn {
  CREATED_AT = 'createdAt',
  NAME = 'name',
  UPDATED_AT = 'updatedAt',
}
export class GetAttributesArgs extends PaginationArgs {
  @IsEnum(QueryAttributesOrderByColumn)
  @ApiPropertyOptional({ enum: QueryAttributesOrderByColumn })
  @IsOptional()
  orderBy?: QueryAttributesOrderByColumn =
    QueryAttributesOrderByColumn.CREATED_AT;

  @IsEnum(SortOrder)
  @ApiPropertyOptional({ enum: SortOrder })
  @IsOptional()
  sortedBy?: SortOrder = SortOrder.DESC;

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  search?: string;
}
