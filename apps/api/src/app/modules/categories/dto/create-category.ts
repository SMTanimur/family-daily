import { ApiProperty } from '@nestjs/swagger';
import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import mongoose from 'mongoose';



export class CreateCategoryDTO {
  @ApiProperty()
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Type is required' })
  @IsString()
  type: string;

  slug: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  image?: string;

  @IsMongoId()
  @IsOptional()
  @ApiProperty({type:String})
  parent?: mongoose.Schema.Types.ObjectId;

}
