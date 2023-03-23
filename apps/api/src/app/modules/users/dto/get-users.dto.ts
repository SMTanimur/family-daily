import { PaginationArgs, SortOrder } from '@family-daily/common';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';

import { User } from '../schemas';


export enum QueryUsersOrderByColumn {
  NAME = 'name',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

export class GetUsersDto extends PaginationArgs {
  @IsEnum(QueryUsersOrderByColumn)
  @ApiPropertyOptional({ enum: QueryUsersOrderByColumn })
  @IsOptional()
  orderBy?: QueryUsersOrderByColumn = QueryUsersOrderByColumn.CREATED_AT;
  @IsEnum(SortOrder)
  @ApiPropertyOptional({ enum: SortOrder })
  @IsOptional()
  sortedBy?: SortOrder = SortOrder.DESC;
  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  search?: string;
  @IsMongoId()
  @ApiPropertyOptional()
  @IsOptional()
  shop?: string;
  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  roles?: string;
}
