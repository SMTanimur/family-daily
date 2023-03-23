import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsOptional, IsString } from 'class-validator';
import { Attribute } from '../../attributes/schemas/attribute.schema';
import { Type } from '../schemas';

export class UpdateSettingsDto {
  @IsMongoId()
  id: string;

  @ApiProperty()
  @IsString()
  isHome: string;

  @ApiProperty()
  @IsString()
  layoutType: string;

  @ApiProperty()
  @IsString()
  productCard: string;
}


export class UpdateBannerDto {
  @IsMongoId()
  id: string;

  @IsString()
  type: Type;

  @IsString()
  title: string;

  @IsString()
  description: string;
  
  @IsString()
  image: string;
}

export class UpdateAttributeGroupDto {
 
  @ApiProperty()
  @IsString()
  name: string;

  slug:string

  @ApiProperty({type: String})
  @IsArray()
  @IsOptional()
  attributes:Attribute[]
}

export class CreateTypeDto  {

  @ApiProperty()
  @IsString()
  name: string;
  
  slug: string;

  @IsString({ each: true })
  @IsOptional()
  @IsArray()
  promotional_sliders: string[];

  @IsArray()
  @IsOptional()
  banners: UpdateBannerDto[];
  
  // @ApiProperty({type: UpdateAttributeGroupDto})
  // @IsArray()
  // @IsOptional()
  // attributeGroup: UpdateAttributeGroupDto[];

  @ApiPropertyOptional({type: UpdateSettingsDto})
  @IsOptional()
  settings?: UpdateSettingsDto;
}
