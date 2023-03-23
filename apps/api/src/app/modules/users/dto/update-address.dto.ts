import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { AddressDto } from './create-address.dto';

export class UpdateAddressDto extends PartialType(AddressDto) {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  _id: string;
}
