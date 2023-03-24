import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Patch,
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
import { AttributesService } from './attributes.service';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { GetAttributesArgs } from './dto/get-attributes.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { Attribute } from './schemas/attribute.schema';

@ApiTags(Attribute.name)
@Controller({ path: 'attributes', version: '1' })
export class AttributesController {
  constructor(private readonly attributesService: AttributesService) {}

  @ApiOperation({ summary: 'Create Attributes' })
  @ApiCreatedResponse({ description: ' successfully created' })
  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(AuthenticatedGuard)
  async create(@Body() createAttributeDto: CreateAttributeDto) {
    return await this.attributesService.createAttribute(createAttributeDto);
  }

  @ApiOperation({ summary: 'Return all attributes' })
  @ApiOkResponse({ description: ' Return attribute' })
  @Get()
  async getAttributes(@Query() query: GetAttributesArgs) {
    return await this.attributesService.getAttributes(query);
  }

  //   @ApiOperation({ summary: 'Return  attribute' })
  //   @ApiOkResponse({ description: 'Return attribute ' })
  //   @Get(':id')
  //  async getAttributeById(@Param('id') id: string) {
  //     return await this.attributesService.getAttributeById(id)
  //   }

  @ApiOperation({ summary: 'Return  attribute' })
  @ApiOkResponse({ description: 'Return attribute ' })
  @Get(':slug')
  async getAttributeBySlug(@Param('slug') slug: string) {
    return await this.attributesService.getAttributeBySlug(slug);
  }

  @ApiOperation({ summary: 'Create Attributes' })
  @ApiCreatedResponse({ description: ' successfully created' })
  @Patch(':id')
  // @Roles(Role.ADMIN)
  @UseGuards(AuthenticatedGuard)
  async update(
    @Param('id') id: string,
    @Body() updateAttributesDto: UpdateAttributeDto
  ) {
    return await this.attributesService.update(id, updateAttributesDto);
  }

  @ApiOperation({ summary: 'Create Attributes' })
  @ApiCreatedResponse({ description: ' successfully created' })
  @Delete(':slug')
  // @Roles(Role.ADMIN)
  @UseGuards(AuthenticatedGuard)
  async delete(@Param('slug') slug: string) {
    return await this.attributesService.delete(slug);
  }
}
