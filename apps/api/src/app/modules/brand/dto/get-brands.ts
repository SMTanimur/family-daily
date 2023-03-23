import { PaginationArgs, SortOrder } from '@family-daily/common';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum,  IsOptional, IsString } from 'class-validator';



export enum QueryBrandsOrderByColumn {
  CREATED_AT = 'createdAt',
  NAME = 'name',
  UPDATED_AT = 'updatedAt',
}

export class GetBrandsDto extends PaginationArgs {
  @IsEnum(QueryBrandsOrderByColumn)
  @ApiPropertyOptional({ enum: QueryBrandsOrderByColumn })
  @IsOptional()
  orderBy?: QueryBrandsOrderByColumn =
    QueryBrandsOrderByColumn.CREATED_AT;
    
  @IsEnum(SortOrder)
  @ApiPropertyOptional({ enum: SortOrder })
  @IsOptional()
  sortedBy?: SortOrder = SortOrder.DESC;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @ApiPropertyOptional()
  @IsOptional()
  search?: string;
 
}
