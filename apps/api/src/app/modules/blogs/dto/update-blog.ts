import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty } from "class-validator";
import { CreateBlogDto } from "./create-blog";

export class UpdateBlogDto extends PartialType(CreateBlogDto) {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  _id: string;
}