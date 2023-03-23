/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConflictException } from '@nestjs/common';
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Connection, PaginateModel } from 'mongoose';
import { Attribute, AttributesDocument } from './schemas/attribute.schema';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import {
  AttributeValue,
  AttributeValueSchema,
} from './schemas/attributeValue.schema';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { GetAttributesArgs } from './dto/get-attributes.dto';
import { AbstractRepository } from '@family-daily/common';

export class AttributesRepository extends AbstractRepository<AttributesDocument> {
  protected readonly logger = new Logger(AttributesRepository.name);

  constructor(
    @InjectModel(Attribute.name)
    private readonly attributeModel: PaginateModel<AttributesDocument>,
    @InjectConnection() connection: Connection,
    @InjectModel(AttributeValue.name)
    private attributeValueModel: PaginateModel<AttributeValueSchema>
  ) {
    super(attributeModel, connection);
  }

  async createAttribute(
    createAttributeDto: CreateAttributeDto
  ): Promise<string> {
    const attribute = await this.attributeModel.findOne({
      name: createAttributeDto.name,
    });
    if (attribute) throw new ConflictException('Attribute already exist');
    const attr = await this.attributeModel.create({
      name: createAttributeDto.name,
      featured: createAttributeDto.featured,
      _id: new mongoose.Types.ObjectId(),
    });
    const values = await this.attributeValueModel.insertMany(
      createAttributeDto.values.map((val) => ({
        attribute: attr._id,
        name: val.name,
      }))
    );
    attr.values = values.map((val) => val);
    await attr.save();
    return 'successfully create attribute';
  }

  async getAttributes(): Promise<Attribute[]> {
    return await this.attributeModel.find({}, {}, { lean: false });
  }

  async findAll({ limit, page, orderBy, sortedBy, search }: GetAttributesArgs) {
    const attributes = await this.attributeModel.paginate(
      {
        ...(search ? { name: { $regex: search, $options: 'i' } } : {}),
      },
      { page, limit, sort: { [orderBy]: sortedBy === 'asc' ? 1 : -1 } }
    );
    const from =
      attributes.page === 1
        ? 1
        : attributes.page * attributes.limit - attributes.limit + 1;

    const to =
      attributes.page === attributes.totalPages
        ? attributes.totalDocs
        : attributes.page * attributes.limit;

    return {
      items: attributes.docs,
      navigation: {
        total: attributes.totalDocs,
        limit: attributes.limit,
        pages: attributes.totalPages,
        page: attributes.page,
        from,
        to,
        type: 'page',
      },
    };
  }

  async updateAttribute(id: string, updateAttributeDto: UpdateAttributeDto) {
    const attrList: any = [];

    for (let i = 0; i < updateAttributeDto.values?.length; i++) {
      const attr = updateAttributeDto.values[i];
      let attrValue: any;
      if (attr.id) {
        attrValue = await this.attributeValueModel.findByIdAndUpdate(attr.id, {
          $set: { name: attr.name },
        });
      } else {
        attrValue = await this.attributeValueModel.create({
          name: attr.name,
          attribute: id,
        });
      }
      attrList.push(attrValue._id);
    }
    return await this.attributeModel.findByIdAndUpdate(
      id,
      {
        $set: {
          name: updateAttributeDto.name,
          values: attrList,
        },
      },
      { new: true }
    );
  }

  async delete(slug: string): Promise<string> {
    const attr = await this.attributeModel.findOne({ slug });
    await this.attributeValueModel.deleteMany({ attribute: attr?._id });
    await this.attributeModel.findOneAndRemove({ slug });
    return 'successfully delete attribute and values';
  }
}
