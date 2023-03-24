import { PaginationArgs } from '@family-daily/common';
import {
  Controller,
  UseGuards,
  Body,
  Post,
  Patch,
  Get,
  Param,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Role } from '../../common/constants/role-enum';
import { Roles } from '../../common/decorators/roles.decorator';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';

import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog';
import { UpdateBlogDto } from './dto/update-blog';
import { Blog } from './schemas';


@ApiTags(Blog.name)
@Controller({ path: 'blogs', version: '1' })
export class BlogsController {
  constructor(
    private readonly blogsService: BlogsService
  ) {}

  @ApiOperation({ summary: 'Create new blog' })
  @ApiCreatedResponse({ description: 'Brand successfully created' })
  @Post()
  @UseGuards(AuthenticatedGuard)
  // @Roles(Role.ADMIN)
  async createBlog(@Body() createBlogDto: CreateBlogDto,@Req() req:any) {
    createBlogDto.user = req.user?._id
    return await this.blogsService.createBlog(createBlogDto)
  }

  @ApiOperation({ summary: 'Update Blog' })
  @ApiCreatedResponse({ description: ' successfully updated' })
  @Patch(':id')
  @UseGuards(AuthenticatedGuard)
  @Roles(Role.ADMIN)
  async updateBlog(@Body() updateBrandDto: UpdateBlogDto) {
    return await this.blogsService.updateBlog(updateBrandDto);
  }

  @ApiOperation({ summary: 'Get  blogs' })
  @ApiOkResponse({ description: 'Return blogs' })
  @Get()
  async findBlogs() {
    return await this.blogsService.findBlogs();
  }
  @ApiOperation({ summary: 'Get Latest blogs' })
  @ApiOkResponse({ description: 'Return Latest blogs' })
  @Get('latest')
  async getLatestBlogs(@Query() paginate:PaginationArgs) {
    return await this.blogsService.getLatestBlogs(paginate);
  }
  @ApiOperation({ summary: 'Get blog' })
  @ApiOkResponse({ description: 'Return blog' })
  @Get(':slug')
  async findBlog(@Param('slug') slug: string) {
    return await this.blogsService.findBlog(slug);
  }

  @ApiOperation({ summary: 'Delete blog' })
  @ApiOkResponse({ description: 'Deleted blog' })
  @Delete(':slug')
  @UseGuards(AuthenticatedGuard)
  @Roles(Role.ADMIN)
  async deleteBlog(@Param('slug') slug: string) {
    return await this.blogsService.deleteBlog(slug);
  }
}
