import { PaginationArgs, SortOrder } from '@family-daily/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';


export enum QueryShopsOrderByColumn {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  NAME = 'name',
}
export class GetNearbyShopsDto extends PaginationArgs {
  @IsString()
  @ApiPropertyOptional({ enum: QueryShopsOrderByColumn })
  @IsOptional()
  orderBy?: QueryShopsOrderByColumn;

  @IsString()
  @ApiPropertyOptional({ enum: SortOrder })
  @IsOptional()
  sortedBy?: SortOrder;

  @IsNumber()
  @Transform((val) => parseFloat(val.value))
  @ApiProperty()
  lat?: number;

  @IsNumber()
  @Transform((val) => parseFloat(val.value))
  @ApiProperty()
  lng?: number;
}
