import { CartService } from './cart.service';
import { CartController } from './cart.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from './schemas';
import { CartRepository } from './cart.repository';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
    ProductsModule,
  ],
  controllers: [CartController],
  providers: [CartService, CartRepository],
})
export class CartModule {}
