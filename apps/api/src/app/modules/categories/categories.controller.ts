import {
  Controller,
  UseGuards,
  Body,
  Post,
  Patch,
  Get,
  Param,
  Delete,
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
import { CategoriesService } from './categories.service';
import { CreateCategoryDTO } from './dto/create-category';
import { GetCategoriesDto } from './dto/get-categories.dto';
import { UpdateCategoryDto } from './dto/update-category';
import { Category } from './schemas';

@ApiTags(Category.name)
@Controller({ path: 'categories', version: '1' })
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: 'Create new Category' })
  @ApiCreatedResponse({ description: 'Category successfully created' })
  @Post()
  @UseGuards(AuthenticatedGuard)
  // @Roles(Role.ADMIN)
  async createCategory(@Body() createCategoryDto: CreateCategoryDTO) {
    return await this.categoriesService.createCategory(createCategoryDto);
  }

  @ApiOperation({ summary: 'Update category' })
  @ApiCreatedResponse({ description: ' successfully updated' })
  @Patch(':id')
  @UseGuards(AuthenticatedGuard)
  // @Roles(Role.ADMIN)
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    return await this.categoriesService.updateCategory(id, updateCategoryDto);
  }

  // @ApiOperation({ summary: 'Get all categories' })
  // @ApiOkResponse({ description: 'Return categories' })
  // @Get()
  // async findCategories(@Query() query: GetCategoriesDto) {
  //   return await this.categoriesService.getCategories(query);
  // }
  @ApiOperation({ summary: 'Get all categories' })
  @ApiOkResponse({ description: 'Return categories' })
  @Get('all')
  async getCategories(@Query() query: GetCategoriesDto) {
    return await this.categoriesService.getAllCategories(query);
  }
  // @ApiOperation({ summary: 'Get category' })
  // @ApiOkResponse({ description: 'Return category' })
  // @Get(':id')
  // async getCategory(@Param('id') id: string) {
  //   return await this.categoriesService.getCategory(id);
  // }

  @ApiOperation({ summary: 'Get category' })
  @ApiOkResponse({ description: 'Return category' })
  @Get(':slug')
  async findCategory(@Param('slug') slug: string) {
    return await this.categoriesService.findCategory(slug);
  }

  @ApiOperation({ summary: 'Delete category' })
  @ApiOkResponse({ description: 'Deleted category' })
  @Delete(':slug')
  @UseGuards(AuthenticatedGuard)
  // @Roles(Role.ADMIN)
  async deleteCategory(@Param('slug') slug: string) {
    return await this.categoriesService.deleteCategory(slug);
  }
}
