/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { CreateTagDto } from './dto/create-tag-dto';
import { GetTagsDto } from './dto/get-tags';
import { UpdateTagDto } from './dto/update-tag-dto';
import { Tag } from './schemas';
import { TagsService } from './tags.service';
@ApiTags(Tag.name)
@Controller({ path: 'tags', version: '1' })
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @ApiOperation({ summary: 'Create new tag' })
  @ApiCreatedResponse({ description: 'Brand successfully created' })
  @Post()
  @UseGuards(AuthenticatedGuard)
  // @Roles(Role.ADMIN)
  async createTag(@Body() createTagDto: CreateTagDto) {
    return await this.tagsService.createTag(createTagDto);
  }

  @ApiOperation({ summary: 'Update Tag' })
  @ApiCreatedResponse({ description: ' successfully updated' })
  @Patch(':id')
  @UseGuards(AuthenticatedGuard)
  // @Roles(Role.ADMIN)
  async updateTag(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return await this.tagsService.update(id, updateTagDto);
  }

  @ApiOperation({ summary: 'Get all Tag' })
  @ApiOkResponse({ description: 'Return Tag' })
  @Get()
  async GetTag(@Query() paginate: GetTagsDto) {
    return await this.tagsService.getTags(paginate);
  }

  @ApiOperation({ summary: 'Get tag' })
  @ApiOkResponse({ description: 'Return tag' })
  @Get(':slug')
  async findBrand(@Param('slug') slug: string) {
    return await this.tagsService.findTag(slug);
  }
  // @ApiOperation({ summary: 'Get Brand' })
  // @ApiOkResponse({ description: 'Return Brand' })
  // @Get(':id')
  // async getBrand(@Param('id')  BrandId:string) {
  //   return await this.tagsService.getBrandById(BrandId);
  // }

  @ApiOperation({ summary: 'Delete Tag' })
  @ApiOkResponse({ description: 'Deleted Tag' })
  @Delete(':slug')
  @UseGuards(AuthenticatedGuard)
  // @Roles(Role.ADMIN)
  async deleteBrand(@Param('slug') slug: string) {
    return await this.tagsService.deleteTag(slug);
  }
}
