import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import mongoose from 'mongoose';
import { AttributeValue } from '../schemas/attributeValue.schema';

export class AttributeValueDto {
  @ApiProperty()
  @IsString()
  name: string;

  @IsMongoId()
  @IsOptional()
  attribute?: mongoose.Schema.Types.ObjectId;

  @IsMongoId()
  @IsOptional()
  id?: string;
}

export class CreateAttributeDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsBoolean()
  featured: boolean;

  slug: string;

  @ApiPropertyOptional({ type: [AttributeValueDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttributeValueDto)
  @IsOptional()
  values?: AttributeValueDto[];
}
