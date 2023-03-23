import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsNumber } from 'class-validator';
import mongoose from 'mongoose';

export class CreateCartDto {
  user: mongoose.Schema.Types.ObjectId;

  @ApiProperty({ type: 'string', format: 'mongoId' })
  @IsMongoId()
  @IsNotEmpty()
  product: mongoose.Schema.Types.ObjectId;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

}
