/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag-dto';
import { GetTagsDto } from './dto/get-tags';
import { UpdateTagDto } from './dto/update-tag-dto';
import { TagDocument } from './schemas';
import { TagsRepository } from './tags.repository';

@Injectable()
export class TagsService {
  constructor(private readonly tagsRepository:TagsRepository){}

  async createTag (createTagDto:CreateTagDto):Promise<string>{

      await this.tagsRepository.create(createTagDto);
      return 'Tag successfully created';
  }

  async update (id:string,updateTagDto:UpdateTagDto):Promise<string>{
    const tag = await this.tagsRepository.findOne({
      _id:id,
    });
    if (tag) {
      await this.tagsRepository.findOneAndUpdate(
        { _id:id },
        updateTagDto
      );

      return 'successfully updated';
  }

}

async getTags(paginate:GetTagsDto) {
  return await this.tagsRepository.getTags(paginate);
}
async getTagById(brandId:string) {
  return await this.tagsRepository.findOne({ _id:brandId });
}

async findTag(slug: string): Promise<TagDocument> {
  const tag = await this.tagsRepository.findOne({ slug });
  if (!tag) throw new NotFoundException('Not Found');
  return tag;
}

async deleteTag(slug: string): Promise<string> {
  const tag = await this.tagsRepository.findOne({ slug });
  if (!tag) throw new NotFoundException('Not found tag');
  await this.tagsRepository.findOneAndRemove({ slug });
  return `${tag.name} tag successfully deleted`;
}
}
