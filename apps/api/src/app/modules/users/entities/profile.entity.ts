
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';
import { IsString } from 'class-validator';

export class Profile {
  avatar?: string
  bio?: string;
  socials?: Social[];
  contact?: string;
  customer?: User;
}

export class Social {
  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsString()
  link: string;
}
