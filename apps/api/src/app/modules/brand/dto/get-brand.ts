import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty } from "class-validator";

export class getBrandDto  {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  _id: string;
}