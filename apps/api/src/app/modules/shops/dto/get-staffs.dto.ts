import { PaginationArgs, SortOrder } from '@family-daily/common';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsOptional, IsString } from 'class-validator';


export enum QueryStaffClassesOrderByColumn {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  NAME = 'name',
}
export class GetStaffsDto extends PaginationArgs {
  @IsString()
  @ApiPropertyOptional({ enum: QueryStaffClassesOrderByColumn })
  @IsOptional()
  orderBy?: QueryStaffClassesOrderByColumn;

  @IsString()
  @ApiPropertyOptional({ enum: SortOrder })
  @IsOptional()
  sortedBy?: SortOrder;

  @IsMongoId()
  @IsOptional()
  shop_id?: string;
}
