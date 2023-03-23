import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddressDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  company?: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Country is required' })
  @IsString()
  country: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Street is required' })
  @IsString()
  street: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'City is required' })
  @IsString()
  city: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'State is required' })
  @IsString()
  state: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Postcode is required' })
  @IsString()
  postcode: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Phone is required' })
  @IsString()
  phone: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  default: boolean;
}
