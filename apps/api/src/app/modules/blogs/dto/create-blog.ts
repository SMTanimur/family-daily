import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import mongoose from 'mongoose';

export class CreateBlogDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Title is required' })
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Description is required' })
  @IsString()
  description: string;

  @ApiProperty({type:[String]})
  @IsNotEmpty({ message: 'Category is required' })
  @IsArray()
  category: string[];
  
  slug: string;

  user:mongoose.Schema.Types.ObjectId
   
  @ApiProperty()
  @IsString()
  @IsOptional()
  image?: string;
}