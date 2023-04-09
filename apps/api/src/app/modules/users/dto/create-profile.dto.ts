import { ApiProperty, PickType } from '@nestjs/swagger';
import { Social } from '../entities/profile.entity';
import { IsOptional, IsString } from 'class-validator';


export class CreateProfileDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({type: [Social]})
  @IsOptional()
  socials?: Social[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  contact?: string;
}
export class ConnectBelongsTo {
  connect: number;
}
