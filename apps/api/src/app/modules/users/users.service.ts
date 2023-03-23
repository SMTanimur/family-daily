/* eslint-disable no-empty */
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDocument } from './schemas';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';
import { map, omit, pick } from 'lodash';
import { AddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { GetUsersDto } from './dto/get-users.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly accountService: AccountService
  ) {}

  // async verifyCredentials(createUserDto: CreateUserDto) {
  //   await this.validateCreateUserRequest(createUserDto);
  //   createUserDto.password = await createHash(createUserDto.password);
  //   // createUserDto.username = createSlugify(createUserDto.name);

  //   // const usernameExists = await this.usersRepository.find({
  //   //   username: createUserDto.username,
  //   // });

  //   // if (usernameExists.length >= 1) {
  //   //   createUserDto.username = `${createUserDto.username}-${usernameExists.length}`;
  //   // }

  //   const token = this.jwtService.sign(createUserDto, { expiresIn: '1h' });

  //   return await this.accountService.sendConfirmation(
  //     createUserDto.email,
  //     token
  //   );
  // }

  async createUser(createUserDto: CreateUserDto) {
    await this.validateCreateUserRequest(createUserDto);
    createUserDto.password = await createHash(createUserDto.password);
    return await this.usersRepository.create(createUserDto);
    // return 'Account has been created' ;
  }

  private async validateCreateUserRequest(createUserDto: CreateUserDto) {
    let user: UserDocument;
    try {
      user = await this.usersRepository.findOne({
        email: createUserDto.email,
      });
    } catch (err) {
      console.error(err.message);
    }

    if (user) {
      throw new UnprocessableEntityException('User already exists.');
    }
  }

  async updateUser(updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      await this.usersRepository.validatePassword(
        updateUserDto._id,
        updateUserDto.currentPassword
      );

      updateUserDto.password = await createHash(updateUserDto.password);
    }
    const userData = await this.usersRepository.findOneAndUpdate(
      { _id: updateUserDto._id },
      updateUserDto
    );

    return {
      message: updateUserDto.password
        ? 'Password changed'
        : 'Account information updated',
      user: userData,
    };
  }

  async findUsers(query: GetUsersDto) {
    return await this.usersRepository.getUsers(query);
  }

  async findSingleUser(userId: string) {
    const user = await this.usersRepository.findOne({ _id: userId });
    return pick(user, ['name', '_id', 'email', 'username', 'phone', 'avatar']);
  }

  async deleteUser(userId: string) {
    this.usersRepository.findOneAndRemove({ _id: userId });
    return 'Account has been deleted';
  }

  async createAddress(id: string, addressDto: AddressDto) {
    return await this.usersRepository.createAddress(id, addressDto);
  }

  async updateAddress(id: string, updateAddressDto: UpdateAddressDto) {
    return await this.usersRepository.updateAddress(id, updateAddressDto);
  }

  async deleteAddress(id: string, addressId: string) {
    await this.usersRepository.findOneAndUpdate(
      { _id: id },
      {
        $pull: {
          addresses: {
            _id: addressId,
          },
        },
      }
    );

    return 'Address has been deleted';
  }
}
