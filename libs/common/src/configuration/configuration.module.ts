import { ConfigModule } from '@nestjs/config';
import { ConfigurationService } from './configuration.service';
import { Global, Module } from '@nestjs/common';
import * as Joi from 'joi';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        JWT_SECRET_KEY: Joi.string().required(),
        SESSION_SECRET_KEY: Joi.string().required(),
        SESSION_NAME: Joi.string().required(),
        WEBMAIL_HOST: Joi.string().required(),
        WEBMAIL_PORT: Joi.number().required(),
        WEBMAIL_USER: Joi.string().required(),
        WEBMAIL_PASSWORD: Joi.string().required(),
        BRAND_NAME: Joi.string().required(),
        NX_API_URL: Joi.string().required(),
        ADMIN_URL: Joi.string().required(),
        WEB_URL: Joi.string().required(),
        LOG_ENABLE: Joi.boolean().required(),
      }),
    }),
  ],
  controllers: [],
  providers: [ConfigurationService],
  exports: [ConfigurationService],
})
export class ConfigurationModule {}
