import { UsersRepository } from './users.repository';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { User } from './schemas';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUsersDto } from './dto/get-users.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/constants/role-enum';

@ApiTags(User.name)
@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly userService: UsersService
  ) {}

  @ApiOperation({ summary: 'create a New User' })
  @ApiOkResponse({ description: 'Create a user' })
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    await this.userService.createUser(createUserDto);
    return 'Account has been created';
  }
  @ApiOperation({ summary: 'User get his Profile' })
  @ApiOkResponse({ description: 'success' })
  @Get('me')
  @UseGuards(AuthenticatedGuard)
  @Roles(Role.CUSTOMER, Role.ADMIN)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async profile(@Req() req: any) {
    const user = await this.usersRepository.findOne({ _id: req?.user?._id });
    delete user.password;
    return user;
  }


  // @ApiOperation({ summary: 'Update user' })
  // @ApiCreatedResponse({ description: 'User successfully updated' })
  // @UseGuards(AuthenticatedGuard)
  // @Roles(Role.CUSTOMER, Role.ADMIN)
  // @Patch()
  // async updateUser(
  //   @Body() updateUserDto: UpdateUserDto,
  //   @Req() req: any
  // ): Promise<any> {
  //   updateUserDto._id = req?.user?._id;
  //   return await this.userService.updateUser(updateUserDto);
  // }

  @ApiOperation({ summary: 'Get Users' })
  @ApiOkResponse({ description: 'Returns all users' })
  @UseGuards(AuthenticatedGuard)
  @Roles(Role.ADMIN)
  @Get()
  async getUsers(@Query() query: GetUsersDto) {
    return await this.userService.findUsers(query);
  }

  @ApiOperation({ summary: 'Get User' })
  @ApiOkResponse({ description: 'Returns user Details' })
  @UseGuards(AuthenticatedGuard)
  @Roles(Role.ADMIN)
  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.userService.findSingleUser(id);
  }
  @ApiOperation({ summary: 'Delete user' })
  @ApiCreatedResponse({ description: 'Deleted user successfully' })
  @UseGuards(AuthenticatedGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.findSingleUser(id);
  }
}
