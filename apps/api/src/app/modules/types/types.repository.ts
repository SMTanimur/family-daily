/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConflictException } from '@nestjs/common';
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Connection, PaginateModel } from 'mongoose';
import { Type, TypeDocument } from './schemas';
import { TypeSetting, TypeSettingSchema } from './schemas/typeSetting.schema';
import { GetTypesDto } from './dto/get-types.dto';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { BannerSchema } from './schemas/banner.schema';
import { AbstractRepository } from '@family-daily/common';


export class TypeRepository extends AbstractRepository<TypeDocument> {
  protected readonly logger = new Logger(TypeRepository.name);

  constructor(
    @InjectModel(Type.name)
    private readonly typeModel: PaginateModel<TypeDocument>,
    @InjectConnection() connection: Connection,
    @InjectModel(TypeSetting.name)
    private typeSettingModel: PaginateModel<TypeSettingSchema>,
    @InjectModel(TypeSetting.name)
    private bannerModel: PaginateModel<BannerSchema>
  ) {
    super(typeModel, connection);
  }

  async getTypes({ search, page, limit, sortedBy, orderBy }: GetTypesDto) {
    const data = await this.typeModel.paginate(
      {
        ...(search ? { name: { $regex: search, $options: 'i' } } : {}),
      },
      {
        page,
        limit,
        sort: {
          [orderBy]: sortedBy === 'asc' ? 1 : -1,
        },
      },
    );
    return data
  }

  async getTypeBySlug(slug: string): Promise<Type> {
    return await this.typeModel.findOne({ slug }).populate(['banners']);
  }

  async createType(createTypeDto: CreateTypeDto) {

    const bannerIds = [];
    const createObj = { ...createTypeDto };
    const dbType = await this.typeModel.create({
      promotional_sliders: createObj.promotional_sliders,
      name: createObj.name,
      settings: createObj.settings,
    });
    if (createTypeDto.banners) {
      const banners = await this.bannerModel.insertMany(createTypeDto.banners);
      bannerIds.push(...banners.map((banner) => banner._id));
    }
    createObj.banners = bannerIds;
    dbType.banners = bannerIds;
     await dbType.save();
     return "Type created successfully"
  }

  async findAll({ search, sortedBy, orderBy }: GetTypesDto) {
    return await this.typeModel.find(
      {
        ...(search ? { name: { $regex: search, $options: 'i' } } : {}),
      },
      {},
      {
        sort: {
          [orderBy]: sortedBy === 'asc' ? 1 : -1,
        },
      },
    );
  }

  // async findOne(id: string) {
  //   return await this.typeModel.findById(id).populate(['banners']);
  // }

  async update(id: string, updateTypeDto: UpdateTypeDto) {
    const updateObj = { ...updateTypeDto };
    const bannerIds = [];

    for (let i = 0; i < updateObj.banners.length; i++) {
      const banner = updateObj.banners[i];
      let savedBanner;
      if (banner.id) {
        savedBanner = await this.bannerModel.findByIdAndUpdate(id, {
          $set: banner,
        });
      } else {
        savedBanner = await this.bannerModel.create(banner);
      }
      bannerIds.push(savedBanner._id);
    }

    if (bannerIds.length > 0) {
      updateObj.banners = bannerIds;
    }

    await this.typeModel.findByIdAndUpdate(
      id,
      {
        $set: updateObj,
      },
      { new: true },
    );
    return "Type updated successfully"
  }

  async remove(id: string) {
    return await this.typeModel.findByIdAndRemove(id, { new: true });
  }
}
