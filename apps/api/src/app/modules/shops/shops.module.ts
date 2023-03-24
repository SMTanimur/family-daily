import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ShopsController } from './shops.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Shop, ShopSchema } from './schemas/shop.shema';
import { PaymentInfo, PaymentInfoSchema } from './schemas/paymentInfo.schema';
import { Balance, BalanceSchema } from './schemas/balance.schema';
import {
  ShopSettings,
  ShopSettingsSchema,
} from './schemas/shopSettings.schema';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Shop.name, schema: ShopSchema },
      { name: PaymentInfo.name, schema: PaymentInfoSchema },
      { name: Balance.name, schema: BalanceSchema },
      { name: ShopSettings.name, schema: ShopSettingsSchema },
    ]),
    UsersModule,
    // MailModule,
    // SettingsModule,
  ],
  controllers: [ShopsController],
  providers: [ShopsService, UsersService],
  exports: [ShopsService, MongooseModule],
})
export class ShopsModule {}
