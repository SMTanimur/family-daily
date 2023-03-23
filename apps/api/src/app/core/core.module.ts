import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TimeoutInterceptor } from './interceptors/timeout.interceptor';
import { PassportModule } from '@nestjs/passport';

import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from '../modules/shared/roles';
import { ConfigurationModule, ConfigurationService, DatabaseModule } from '@family-daily/common';

// @Global()
@Module({
  imports: [
    DatabaseModule,
    ConfigurationModule,
    PassportModule.register({ session: true }),
    {
      ...JwtModule.registerAsync({
        useFactory: async (configurationService: ConfigurationService) => ({
          secret: configurationService.JWT_SECRET_KEY,
          signOptions: { expiresIn: '1d' },
        }),
        inject: [ConfigurationService],
      }),
      global: true,
    },
  ],
  providers: [
    // { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    // { provide: APP_INTERCEPTOR, useClass: TimeoutInterceptor },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
  exports: [JwtModule],
})
export class CoreModule {}
