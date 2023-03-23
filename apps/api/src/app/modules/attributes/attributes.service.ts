import { Injectable } from '@nestjs/common';
import { AttributesRepository } from './attributes.repository';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { GetAttributesArgs } from './dto/get-attributes.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { Attribute } from './schemas/attribute.schema';

@Injectable()
export class AttributesService {
  constructor(private readonly attributesRepository: AttributesRepository) {}

  async createAttribute(
    createAttributeDto: CreateAttributeDto
  ): Promise<string> {
    return await this.attributesRepository.createAttribute(createAttributeDto);
  }

  async getAttributes(query:GetAttributesArgs) {
    return await this.attributesRepository.findAll(query);
  }

  async getAttributeById(id: string): Promise<Attribute> {
    return await this.attributesRepository.findOne({ _id: id });
  }
  async getAttributeBySlug(slug: string): Promise<Attribute> {
    return await this.attributesRepository.findOne({ slug });
  }

  async update(id: string, updateAttributesDto: UpdateAttributeDto) {
    return await this.attributesRepository.updateAttribute(
      id,
      updateAttributesDto
    );
  }
  async delete(slug: string):Promise<string> {
    return await this.attributesRepository.delete(slug);
  }
}
