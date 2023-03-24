import {
  Body,
  Controller,
  Delete,
  Post,
  Req,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginDto } from './dto/login.dto';

import { ConfigurationService } from '@family-daily/common';
import { AccountService } from '@family-daily/mail';

@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly configurationService: ConfigurationService,
    private readonly accountService: AccountService,
    private readonly UsersService: UsersService
  ) {}

  @ApiOperation({ summary: 'Register New User' })
  @ApiOkResponse({ description: 'Register user' })
  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
    @Session() session: any
  ) {
    const data = await this.UsersService.createUser(createUserDto);
    const token = this.jwtService.sign(createUserDto, { expiresIn: '1h' })

   const result=  await this.accountService.sendConfirmation(data.email,token)
   console.log(result)
    return {
      success: true,
      message:
        'We have sent you an email on the given account. Please verify.',
    };
  }

  // @ApiOperation({ summary: 'Activate user account' })
  // @ApiCreatedResponse({ description: 'User account has been activated' })
  // @Post('activate')
  // async activate(@Body() body: AccountActivateDto, @Session() session) {
  //   const payload = this.jwtService.verify<CreateUserDto>(body.token);

  //   const data = await this.UsersService.createUser(payload);

  //   const user = pick(data, ['_id', 'email', 'username', 'role']);
  //   session.passport = { user };
  //   return {
  //     message: `Welcome to ${this.configurationService.BRAND_NAME}! 🎉`,
  //     role: user.role,
  //   };
  // }

  @ApiOperation({ summary: 'Logs user into the system' })
  @ApiOkResponse({ description: 'Logged in successfully.' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Req() req,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() _body: LoginDto
  ) {
    return { message: 'Welcome back! 🎉', user: req.user };
  }

  @ApiOperation({ summary: 'User Logout Attempt' })
  @ApiOkResponse({
    description: 'User logout successfully.',
  })
  @Delete('logout')
  async logout(@Req() req, @Res() res) {
    await req.session.destroy(() => null);
    await res.clearCookie(this.configurationService.SESSION_NAME);
    await req.logout(() => null);
    return res.status(200).send('Successfully logout');
  }
}
