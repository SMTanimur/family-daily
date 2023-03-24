import { ShopSchema, Shop } from './schemas/shop.shema';
import mongoose, {
  Model,
  ObjectId,
  PaginateModel,
} from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  ApproveShopDto,
  CreateShopDto,
  DisApproveDto,
} from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { GetShopsDto } from './dto/get-shops.dto';
import { GetStaffsDto } from './dto/get-staffs.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Balance, BalanceSchema } from './schemas/balance.schema';
import {
  ShopSettings,
  ShopSettingsSchema,
} from './schemas/shopSettings.schema';
import { CreateBalanceDto } from './dto/create-balance.dto';
import { UpdateBalanceDto } from './dto/update-balance.dto';
import { PaymentInfoSchema, PaymentInfo } from './schemas/paymentInfo.schema';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { CreateShopSettingDto } from './dto/create-shopsettings.dto';
import { UpdateShopSettingDto } from './dto/update-shopsettings.dto';

import { GetNearbyShopsDto } from './dto/get-nearby-shops.dto';
import { User, UserDocument } from '../users/schemas';
import { UsersService } from '../users/users.service';

@Injectable()
export class ShopsService {
  constructor(
    @InjectModel(Shop.name)
    private shopModel: PaginateModel<ShopSchema>,
    // @InjectModel(Shop.name)
    // private shopAggregateModel: AggregatePaginateModel<ShopSchema>,
    @InjectModel(Balance.name)
    private balanceModel: PaginateModel<BalanceSchema>,
    @InjectModel(ShopSettings.name)
    private settingsModel: PaginateModel<ShopSettingsSchema>,
    @InjectModel(PaymentInfo.name)
    private paymentModel: PaginateModel<PaymentInfoSchema>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly userService: UsersService,
  ) {}

  // async create(createShopDto: CreateShopDto, user: any) {
  //   const shop = await this.shopModel.create({
  //     ...createShopDto,
  //     slug: convertToSlug(createShopDto.name),
  //   });
  //   if (!user.roles.includes(Role.STORE_OWNER)) {
  //     await this.userService.addUserPermission(createShopDto.owner, {
  //       permissions: Role.STORE_OWNER,
  //     });
  //   }
  //   await this.userService.addUserShop(createShopDto.owner, shop._id);
  //   return shop;
  // }

  // async createShopStaff(createStaffDto: CreateUserDto, shopUser: any) {
  //   if (createStaffDto.shop) {
  //     const shop = await this.shopModel.findById(createStaffDto.shop);
  //     if (!shop || !shop.is_active) {
  //       throw new HttpException(
  //         'Shop is not activated or not found.',
  //         HttpStatus.BAD_REQUEST,
  //       );
  //     }
  //   }
  //   const user = await this.userService.createStaff({
  //     ...createStaffDto,
  //     shop: createStaffDto.shop,
  //     shops: [createStaffDto.shop],
  //     roles: [Role.STAFF],
  //   });
  //   await this.shopModel.findByIdAndUpdate(createStaffDto.shop, {
  //     $push: { staffs: user._id },
  //   });
  //   await this.mailService.sendStaffLoginCredentials({
  //     ...user,
  //     password: createStaffDto.password,
  //   });
  //   return user;
  // }

  // async getShops({ search, limit, page, orderBy, sortedBy }: GetShopsDto) {
  //   const responses = await this.shopModel.paginate(
  //     {
  //       ...(search ? { name: { $regex: search, $options: 'i' } } : {}),
  //     },
  //     {
  //       limit,
  //       page,
  //       populate: ['owner'],
  //       sort: {
  //         [orderBy]: sortedBy === 'asc' ? 1 : -1,
  //       },
  //     },
  //   );
  //   return PaginationResponse(responses);
  // }

  // async getStaffs({ shop_id, orderBy, sortedBy }: GetStaffsDto) {
  //   const staff = await this.userModel.find(
  //     {
  //       $or: [{ shops: shop_id }, { shop: shop_id }],
  //       roles: Role.STAFF,
  //     },
  //     {},
  //     {
  //       sort: {
  //         [orderBy]: sortedBy === 'asc' ? 1 : -1,
  //       },
  //     },
  //   );
  //   return staff;
  // }

  // async getNearByShops({
  //   lat,
  //   lng,
  //   orderBy,
  //   sortedBy,
  //   page,
  //   limit,
  // }: GetNearbyShopsDto) {
  //   const aggregate = this.shopModel.aggregate([
  //     {
  //       $geoNear: {
  //         near: {
  //           type: 'Point',
  //           coordinates: [lat, lng],
  //         },
  //         distanceField: 'distance',
  //         spherical: true,
  //       },
  //     },
  //     {
  //       $sort: { [orderBy]: sortedBy === 'asc' ? 1 : -1 },
  //     },
  //   ]);

  //   const data = await this.shopAggregateModel.aggregatePaginate(aggregate, {
  //     ...(limit ? { limit } : {}),
  //     ...(page ? { page } : {}),
  //   });

  //   return data;
  // }

  // async getNearByShopsNew({ lat, lng, orderBy, sortedBy }: GetNearbyShopsDto) {
  //   const shops = await this.shopModel.aggregate([
  //     {
  //       $search: {
  //         index: 'name',
  //         compound: {
  //           must: [
  //             {
  //               geoWithin: {
  //                 circle: {
  //                   center: {
  //                     type: 'Point',
  //                     coordinates: [lat, lng],
  //                     radius: 10000,
  //                   },
  //                 },
  //               },
  //             },
  //           ],
  //         },
  //       },
  //     },
  //     {
  //       $project: {
  //         $score: { $meta: 'searchScore' },
  //       },
  //     },
  //   ]);
  //   return shops;
  // }

  // async getShop(slug: string): Promise<Shop> {
  //   return await this.shopModel.findOne({ slug });
  // }

  // async update(id: string, updateShopDto: UpdateShopDto) {
  //   return await this.shopModel.findByIdAndUpdate(
  //     id,
  //     { $set: updateShopDto },
  //     { new: true },
  //   );
  // }

  // async updateStaff(id: string, updateStaffDto: UpdateUserDto) {
  //   return await this.userService.update(id, updateStaffDto);
  // }

  // async updateMultiple(ids: string, updateShopDto: UpdateShopDto) {
  //   return await this.shopModel.updateMany(
  //     { _id: { $in: ids } },
  //     { $set: updateShopDto },
  //     { new: true },
  //   );
  // }

  // async approve({ id, admin_commission_rate }: ApproveShopDto) {
  //   return await this.shopModel.findByIdAndUpdate(
  //     id,
  //     {
  //       $set: {
  //         is_active: true,
  //         'balance.admin_commission_rate': admin_commission_rate,
  //       },
  //     },
  //     { new: true },
  //   );
  // }

  // async disApprove({ id }: DisApproveDto) {
  //   return await this.shopModel.findByIdAndUpdate(
  //     id,
  //     {
  //       $set: { is_active: false },
  //     },
  //     { new: true },
  //   );
  // }

  // async remove(id: string) {
  //   return await this.shopModel.findByIdAndRemove(id, { new: true });
  // }

  // async removeStaff(id: string) {
  //   return await this.userService.remove(id);
  // }

  // async createBalance(createBalanceDto: CreateBalanceDto) {
  //   const paymentInfo = await this.createPaymentInfo({
  //     shop: createBalanceDto.shop,
  //   });
  //   return await this.balanceModel.create({
  //     ...createBalanceDto,
  //     payment_info: paymentInfo._id,
  //   });
  // }

  // async updateBalance(id: string, updateBalanceDto: UpdateBalanceDto) {
  //   return await this.balanceModel.findByIdAndUpdate(updateBalanceDto, {
  //     $set: updateBalanceDto,
  //   });
  // }

  // async addOrderMultiple(ids: any[], amount: any) {
  //   return await this.shopModel.updateMany(
  //     {
  //       _id: { $in: ids },
  //     },
  //     {
  //       $inc: { orders_count: amount },
  //     },
  //     { new: true },
  //   );
  // }

  // async addOrder(id: ObjectId, ordersCount: number) {
  //   return await this.shopModel.findByIdAndUpdate(
  //     id,
  //     {
  //       $inc: { orders_count: ordersCount },
  //     },
  //     { new: true },
  //   );
  // }

  // async createPaymentInfo(createPaymentDto: CreatePaymentDto) {
  //   return await this.paymentModel.create(createPaymentDto);
  // }

  // async createShopSettings(createSettingDto: CreateShopSettingDto) {
  //   return await this.settingsModel.create(createSettingDto);
  // }

  // async updateShopSettings(
  //   id: string,
  //   updateShopSettingDto: UpdateShopSettingDto,
  // ) {
  //   return await this.settingsModel.findByIdAndUpdate(
  //     id,
  //     {
  //       $set: updateShopSettingDto,
  //     },
  //     { new: true },
  //   );
  // }

  // async updatePaymentInfo(id: string, updatePaymentDto: UpdatePaymentDto) {
  //   return await this.paymentModel.findByIdAndUpdate(
  //     id,
  //     {
  //       $set: updatePaymentDto,
  //     },
  //     { new: true },
  //   );
  // }
}
