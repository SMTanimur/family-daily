/* eslint-disable no-empty */
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDocument } from './schemas';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';
import { map, omit, pick } from 'lodash';
import { GetUsersDto } from './dto/get-users.dto';
import { createHash } from '../../utils/hash';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
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
     await this.usersRepository.findOneAndUpdate(
      { _id: updateUserDto._id },
      updateUserDto
    );
    return 'Account information updated'
  }
  async createProfile(id:string,createProfileDto: CreateProfileDto) {
     return await this.usersRepository.createProfile(id,createProfileDto);
  }
  async updateProfile(id:string,createProfileDto: UpdateProfileDto) {
     return await this.usersRepository.updateProfile(id,createProfileDto);
  }


  async banUser(id: string) {
    return await this.usersRepository.banUser(id)
  }

  async activateUser(id: string) {
    return await this.usersRepository.activateUser(id)
  }


  async updateByEmail(email: string, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.findOneAndUpdate(
      { email },
      { $set: updateUserDto }
    );
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

  
}
