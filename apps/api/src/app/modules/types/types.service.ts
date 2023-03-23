import { CreateTypeDto } from './dto/create-type.dto';
/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { TypeRepository } from './types.repository';
import { UpdateTypeDto } from './dto/update-type.dto';
import { GetTypesDto } from './dto/get-types.dto';
import { Type } from './schemas';

@Injectable()
export class TypesService {
  constructor( private readonly typeRepository:TypeRepository) {}

  async createType(createTypeDto:CreateTypeDto) {
   return await this.typeRepository.createType(createTypeDto);
  }


  async getTypes(query: GetTypesDto) {
    return await this.typeRepository.getTypes(query);
  }

  async getTypeBySlug(slug: string): Promise<Type> {
    return await this.typeRepository.getTypeBySlug(slug);
  }

  async findAll(query: GetTypesDto) {
   return await this.typeRepository.findAll(query);
  }

  async update(id: string, updateTypeDto: UpdateTypeDto) {
    return await this.typeRepository.update(id, updateTypeDto);
  }

  async remove(id: string) {
    return await this.typeRepository.remove(id);
  }
}
