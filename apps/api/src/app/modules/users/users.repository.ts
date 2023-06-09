
import { User, UserDocument } from './schemas';
import {
  Logger,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, PaginateModel } from 'mongoose';
import { omit, pick } from 'lodash';
import { AbstractRepository } from '@family-daily/common';
import { GetUsersDto } from './dto/get-users.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

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


  async createProfile(id:string,createProfileDto: CreateProfileDto) {
    const user = await this.userModel.findOne({ _id: id });
     if (!user) {
       throw new UnprocessableEntityException('User not found');
     }
     user.profile = createProfileDto;
      await user.save()
   
   return 'Account information updated'
 }
  async updateProfile(id:string,updateProfileDto: UpdateProfileDto) {
    const user = await this.userModel.findOne({ _id: id });
     if (!user) {
       throw new UnprocessableEntityException('User not found');
     }
     await this.userModel.findOneAndUpdate({ _id: id }, { $set: { profile: updateProfileDto } })
   
   return 'Account information updated'
 }

 async banUser(id: string) {
  return await this.userModel.findByIdAndUpdate(id, {
    $set: { is_active: false },
  });
}

async activateUser(id: string) {
  return await this.userModel.findByIdAndUpdate(id, {
    $set: { is_active: true },
  });
}


}
