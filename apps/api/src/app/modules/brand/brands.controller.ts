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
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand';
import { GetBrandsDto } from './dto/get-brands';
import { UpdateBrandDto } from './dto/update-brand';
import { Brand } from './schemas';


@ApiTags(Brand.name)
@Controller({ path: 'brands', version: '1' })
export class BrandsController {
  constructor(
    private readonly brandsService: BrandsService
  ) {}

  @ApiOperation({ summary: 'Create new brand' })
  @ApiCreatedResponse({ description: 'Brand successfully created' })
  @Post()
  @UseGuards(AuthenticatedGuard)
  @Roles(Role.ADMIN)
  async createBrand(@Body() createCategoryDto: CreateBrandDto) {
    return await this.brandsService.createBrand(createCategoryDto)
  }

  @ApiOperation({ summary: 'Update Brand' })
  @ApiCreatedResponse({ description: ' successfully updated' })
  @Patch(':id')
  @UseGuards(AuthenticatedGuard)
  // @Roles(Role.ADMIN)
  async updateBrand(  @Param('id') id:string, @Body() updateBrandDto: UpdateBrandDto) {
    return await this.brandsService.updateBrand(id,updateBrandDto);
  }

  @ApiOperation({ summary: 'Get all brands' })
  @ApiOkResponse({ description: 'Return brands' })
  @Get()
  async GetBrands(@Query() paginate:GetBrandsDto) {
    return await this.brandsService.getBrands(paginate);
  }

  @ApiOperation({ summary: 'Get brand' })
  @ApiOkResponse({ description: 'Return brand' })
  @Get(':slug')
  async findBrand(@Param('slug') slug: string) {
    return await this.brandsService.findBrand(slug);
  }
  @ApiOperation({ summary: 'Get brand' })
  @ApiOkResponse({ description: 'Return brand' })
  @Get(':id')
  async getBrand(@Param('id')  brandId:string) {
    return await this.brandsService.getBrandById(brandId);
  }

  @ApiOperation({ summary: 'Delete brand' })
  @ApiOkResponse({ description: 'Deleted brand' })
  @Delete(':slug')
  @UseGuards(AuthenticatedGuard)
  // @Roles(Role.ADMIN)
  async deleteBrand(@Param('slug') slug: string) {
    return await this.brandsService.deleteBrand(slug);
  }
}
