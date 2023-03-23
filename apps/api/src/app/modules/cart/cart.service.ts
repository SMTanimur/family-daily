/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from '../products/products.repository';
import { Product } from '../products/schemas';
import { CartRepository } from './cart.repository';
import { CreateCartDto } from './dto/create-cart-dto';

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly productsRepository: ProductsRepository
  ) {}

  async addToCart(createCartDto: CreateCartDto) {
    const product = await this.productsRepository.findOne({
      _id: createCartDto.product,
    });
    if (!product) throw new NotFoundException('Product not found');

    if (!(product.stock == 'in-stock'))
      throw new NotFoundException('Out of stock');

    const cartInDB = await this.cartRepository.findCartOne(
      String(createCartDto.user),
      String(createCartDto.product)
    );

    if (cartInDB) {
      return await this.updateQuantity(createCartDto, product);
    } else {
      return await this.addNewProductToCart(createCartDto, product);
    }
  }

  async addNewProductToCart(createCartDto: CreateCartDto, product: Product) {
    console.log(product);
    const cart = await this.cartRepository.create({
      user: createCartDto.user,
      product: createCartDto.product,
      quantity: createCartDto.quantity,
      total: product.price * createCartDto.quantity,
    });
    return cart;
  }

  async updateQuantity(createCartDto: CreateCartDto, product: Product) {
    const cartItem = await this.cartRepository.findOne({
      product: createCartDto.product,
      user: createCartDto.user,
    });

    const quantityField = createCartDto.quantity > 1;

    const updateCart = await this.cartRepository.findOneAndUpdate(
      {
        user: createCartDto.user,
        product: createCartDto.product,
      },

      createCartDto.quantity > 1
        ? {
            $set: {
              quantity: createCartDto.quantity,
              total: product.price * createCartDto.quantity,
            },
          }
        : {
            $inc: {
              quantity: createCartDto.quantity,
              total: product.price * createCartDto.quantity,
            },
          }
    );
    console.log(updateCart);
    return updateCart;
  }

  async getCarts(user: string) {
    return await this.cartRepository.getCarts(user);
  }

  async deleteSingleCart(userId: string, productId: string): Promise<string> {
    return await this.cartRepository.deleteSingleCart(userId, productId);
  }

  async deleteCarts(user: string): Promise<string> {
    return await this.cartRepository.deleteCarts(user);
  }
}
