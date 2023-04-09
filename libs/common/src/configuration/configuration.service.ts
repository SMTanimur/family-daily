import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConfigurationService {
  constructor(private readonly configService: ConfigService) {}

  get BRAND_NAME() {
    return this.configService.get<string>('BRAND_NAME');
  }

  get API_URL() {
    return this.configService.get<string>('NX_API_URL');
  }
  get MAIL() {
    return this.configService.get<string>('MAIL');
  }

  get ADMIN_URL() {
    return this.configService.get<string>('ADMIN_URL');
  }

  get WEB_URL() {
    return this.configService.get<string>('WEB_URL');
  }

  get MONGODB_URI() {
    return this.configService.get<string>('MONGODB_URI');
  }

  get LOG_ENABLE() {
    return this.configService.get<boolean>('LOG_ENABLE');
  }

  get JWT_SECRET_KEY() {
    return this.configService.get<string>('JWT_SECRET_KEY');
  }
  get EMAIL_SERVER_HOST() {
    return this.configService.get<string>('EMAIL_SERVER_HOST');
  }
  get EMAIL_SERVER_PORT() {
    return this.configService.get<number>('EMAIL_SERVER_PORT');
  }
  get EMAIL_SERVER_USER() {
    return this.configService.get<string>('EMAIL_SERVER_USER');
  }
  get GOOGLE_CLIENT_ID() {
    return this.configService.get<string>('GOOGLE_CLIENT_ID');
  }
  get GOOGLE_CLIENT_SECRET() {
    return this.configService.get<string>('GOOGLE_CLIENT_SECRET');
  }
  get GOOGLE_REFRESH_TOKEN() {
    return this.configService.get<string>('GOOGLE_REFRESH_TOKEN');
  }

  get SESSION_SECRET_KEY() {
    return this.configService.get<string>('SESSION_SECRET_KEY');
  }

  get WEBMAIL_HOST() {
    return this.configService.get<string>('WEBMAIL_HOST');
  }

  get WEBMAIL_PORT() {
    return this.configService.get<number>('WEBMAIL_PORT');
  }

  get WEBMAIL_USER() {
    return this.configService.get<string>('WEBMAIL_USER');
  }

  get WEBMAIL_PASSWORD() {
    return this.configService.get<string>('WEBMAIL_PASSWORD');
  }
  get SESSION_NAME() {
    return this.configService.get<string>('SESSION_NAME');
  }
}
