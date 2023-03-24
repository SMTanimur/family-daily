
import { User, UserDocument } from './schemas';
import {
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, PaginateModel } from 'mongoose';
import { omit, pick } from 'lodash';
import { AbstractRepository } from '@family-daily/common';
import { GetUsersDto } from './dto/get-users.dto';

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
}
