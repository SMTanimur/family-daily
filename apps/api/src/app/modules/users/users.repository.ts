
import { User, UserDocument } from './schemas';
import {
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, PaginateModel } from 'mongoose';
import { omit, pick } from 'lodash';
import { AddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { GetUsersDto } from './dto/get-users.dto';
import { AbstractRepository } from '@family-daily/common';

export class UsersRepository extends AbstractRepository<UserDocument> {
  protected readonly logger = new Logger(UsersRepository.name);

  constructor(
    @InjectModel(User.name) private readonly userModel: PaginateModel<UserDocument>,
    @InjectConnection() connection: Connection
  ) {
    super(userModel, connection);
  }

  async validateUser(email: string, password: string) {
    const user = await this.userModel.findOne({ email });

    if (!user) throw new NotFoundException('There is no user with this email.');

    if (!(await user.comparePassword(password)))
      throw new UnauthorizedException('The password you entered is incorrect.');

    return pick(user.toJSON(), [
      '_id',
      'username',
      'email',
      'name',
      'role',
      'avatar',
    ]);
  }

  async validatePassword(userId: string, password: string) {
    const user = await this.userModel.findOne({ _id: userId });

    if (!(await user.comparePassword(password)))
      throw new UnauthorizedException('The password you entered is incorrect.');

    return true;
  }

  async createAddress(id: string, addressDto: AddressDto) {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('User not found.');

    if (addressDto.default) {
      const addressIndex = user.addresses.findIndex((x) => x.default);
      if (addressIndex !== -1) user.addresses[addressIndex].default = false;
    }

    user.addresses.push(addressDto);
    await user.save();

    return 'New address added.';
  }

  async updateAddress(id: string, updateAddressDto: UpdateAddressDto) {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('User not found.');

    const addressIndex = user.addresses.findIndex(
      (x: any) => String(x._id) === String(updateAddressDto._id)
    );

    if (addressIndex === -1) throw new NotFoundException('Address not found.');

    if (updateAddressDto.default) {
      const defaultAddressIndex = user.addresses.findIndex((x) => x.default);

      if (defaultAddressIndex !== -1)
        user.addresses[defaultAddressIndex].default = false;
    }

    await user.save();

    // eslint-disable-next-line prefer-const
    let updateAddressData = {};

    // eslint-disable-next-line prefer-const
    for (let key in updateAddressDto) {
      if (key !== '_id') {
        updateAddressData[`addresses.$.${key}`] = updateAddressDto[key];
      }
    }

    await this.model.findOneAndUpdate(
      { _id: id, 'addresses._id': updateAddressDto._id },
      {
        $set: updateAddressData,
      }
    );

    return 'Address updated.';
  }


  async getUsers({
    search,
    roles,
    limit,
    page,
    orderBy,
    sortedBy,
  }: GetUsersDto) {
    const users= await this.userModel.paginate(
      {
        ...(search ? { name: { $regex: search, $options: 'i' } } : {}),
        ...(roles ? { role: roles } : {}),
      },
      {
        limit,
        page,
        sort: { [orderBy]: sortedBy === 'asc' ? 1 : -1 },
      },
    );


    const from =
    users.page === 1 ? 1 : users.page * users.limit - users.limit + 1;

  const to =
    users.page === users.totalPages
      ? users.totalDocs
      : users.page * users.limit;

  return {
    items: users.docs,
    navigation: {
      total: users.totalDocs,
      limit: users.limit,
      pages: users.totalPages,
      page: users.page,
      from,
      to,
      type: 'page',
    },
  };
  }
}
