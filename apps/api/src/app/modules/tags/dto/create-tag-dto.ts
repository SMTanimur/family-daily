import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class CreateTagDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  name: string;

  @ApiProperty({ type: String})
  @IsNotEmpty({ message: 'Type is required' })
  @IsMongoId()
  type: mongoose.Schema.Types.ObjectId

  @ApiProperty()
  @IsOptional()
  @IsString()
  details: string;

  slug: string;

}
