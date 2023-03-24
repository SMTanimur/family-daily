import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsEmail, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, ValidateNested } from 'class-validator';
import { Role } from '../../../common/constants/role-enum';
import { Shop } from '../../shops/schemas/shop.shema';
import { Profile } from '../schemas/profile.schema';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail()
  email: string;


  @ApiProperty()
  @IsNotEmpty({ message: 'Password is required' })
  @IsString()
  password: string;

  @IsMongoId()
  @IsOptional()
  @ApiProperty()
  shop?: Shop;

  @ValidateNested()
  @Type(() => Profile)
  @ApiProperty()
  @IsOptional()
  profile?: Profile;

  @IsMongoId({ each: true })
  @IsArray()
  @IsOptional()
  @ApiProperty()
  shops?: Shop[];

  @IsMongoId()
  @IsOptional()
  @ApiProperty()
  managed_shop?: Shop;

  @IsBoolean()
  @IsOptional()
 
  is_active?: boolean;

  @IsPhoneNumber(null, {
    message: 'Contact must be valid phone number. (eg: +92XXXXXXXXXX)',
  })
  @IsOptional()
  contact?: string;

  @IsBoolean()
  @IsOptional()
  email_verified?: boolean;

  @IsEnum(Role)
  @IsOptional()
  roles?: Role[];
}
