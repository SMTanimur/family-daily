import { MailService } from './services/mail.service';
import { Module, Global } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { AccountService } from './services/account.service';
import { ConfigurationService } from '@family-daily/common';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (configurationService: ConfigurationService) => ({
        transport: {
          host: configurationService.WEBMAIL_HOST,
          port: configurationService.WEBMAIL_PORT,
          auth: {
            user: configurationService.WEBMAIL_USER,
            pass: configurationService.WEBMAIL_PASSWORD,
          },
        },
        defaults: {
          from: `"${configurationService.BRAND_NAME}" <${configurationService.WEBMAIL_USER}>`,
        },
        template: {
          dir: join(__dirname, 'assets', 'templates'),
          adapter: new HandlebarsAdapter(),

          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigurationService],
    }),
  ],
  controllers: [],
  providers: [MailService, AccountService],
  exports: [MailService, AccountService],
})
export class MailModule {}
