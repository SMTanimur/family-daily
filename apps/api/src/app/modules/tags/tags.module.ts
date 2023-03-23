import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tag, TagSchema } from './schemas';
import { TagsRepository } from './tags.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }])],
  controllers: [TagsController],
  providers: [TagsService,TagsRepository],
})
export class TagsModule {}
