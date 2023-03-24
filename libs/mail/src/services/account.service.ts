/*
https://docs.nestjs.com/providers#services
*/

import { ConfigurationService } from '@family-daily/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configurationService: ConfigurationService
  ) {}

  async sendConfirmation(email: string, token: string) {
    const url = `${this.configurationService.WEB_URL}/account/activation/${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: `Welcome to ${this.configurationService.BRAND_NAME}! Confirm your Email`,
      template: 'account/confirmation', // `.hbs` extension is appended automatically
      context: { url },
    });
    return `Account activation email has been sent to ${email}`;
  }
}
