import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { AddressDto } from './create-address.dto';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({ type: String })
  _id: string;

  @ApiProperty({ type: () => AddressDto })
  @Type(() => AddressDto)
  @ValidateNested({ each: true })
  @IsOptional()
  addresses?: AddressDto[];

  @ApiProperty({ type: String })
  @IsOptional()
  currentPassword?: string;

  @ApiProperty({ type: String })
  @IsOptional()
  avatar?: string;
}
