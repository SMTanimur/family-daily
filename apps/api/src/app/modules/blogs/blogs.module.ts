import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { Module } from '@nestjs/common';
import { BlogsRepository } from './blogs.repository';
import { Blog, BlogSchema } from './schemas';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),],
  controllers: [BlogsController],
  providers: [BlogsService,BlogsRepository],
})
export class BlogsModule {}
