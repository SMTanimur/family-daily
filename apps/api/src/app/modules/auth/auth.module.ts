import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { Module } from '@nestjs/common';
import { LocalStrategy } from './strategy/local.strategy';
import { SessionSerializer } from './session.serializer';
import { AccountService, MailModule } from '@family-daily/mail';

@Module({
  imports: [UsersModule,MailModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer,AccountService],
})
export class AuthModule {}
