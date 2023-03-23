/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { CreateTypeDto } from './dto/create-type.dto';
import { GetTypesDto } from './dto/get-types.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { Type } from './schemas';
import { TypesService } from './types.service';

@ApiTags(Type.name)
@Controller({ path: 'types', version: '1' })
export class TypesController {
  constructor( private readonly typesService:TypesService) {}

  @ApiOperation({ summary: 'Create a Type' })
  @ApiCreatedResponse({ description: ' successfully created' })
  @Post()
  // @Roles(Role.ADMIN)
  @UseGuards(AuthenticatedGuard)
  async create(@Body() createTypeDto:CreateTypeDto) {
    return await this.typesService.createType(createTypeDto);
  }

  @ApiOperation({ summary: 'Get all types' })
  @ApiOkResponse({ description: 'Return types' })
  @Get()
  findAll(@Query() query: GetTypesDto) {
    return this.typesService.getTypes(query);
  }
  @ApiOperation({ summary: 'Get all types' })
  @ApiOkResponse({ description: 'Return types' })
  @Get('all')
  getAllTypes(@Query() query: GetTypesDto) {
    return this.typesService.findAll(query);
  }

  @ApiOperation({ summary: 'Get  type' })
  @ApiOkResponse({ description: 'Return type' })
  @Get(':slug')
  getTypeBySlug(@Param('slug') slug: string) {
    return this.typesService.getTypeBySlug(slug);
  }

  @ApiOperation({ summary: 'Update type and value' })
  @ApiOkResponse({ description: 'Return successfully updated' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypeDto: UpdateTypeDto) {
    return this.typesService.update(id, updateTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typesService.remove(id);
  }
}
