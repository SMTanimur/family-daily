import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBrandDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Type is required' })
  @IsString()
  type: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  country: string;

  slug: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  image?: string;
}
