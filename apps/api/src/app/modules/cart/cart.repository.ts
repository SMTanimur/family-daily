
import { AbstractRepository } from '@family-daily/common';
import { Logger, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import  { Connection, PaginateModel } from 'mongoose';
import { Cart, CartDocument } from './schemas';



export class CartRepository extends AbstractRepository<CartDocument> {
  protected readonly logger = new Logger(CartRepository.name);

  constructor(
    @InjectModel(Cart.name)
    private readonly cartModel: PaginateModel<CartDocument>,
    @InjectConnection() connection: Connection
  ) {
    super(cartModel, connection);
  }

  

  async findCartOne(user: string, product: string) {
    const exitCart = this.cartModel.findOne({ user, product });

    if (!exitCart) throw new NotFoundException('Cart not found');
    return exitCart;
  }

  async deleteSingleCart(userId: string, productId: string): Promise<string> {
    const deleteCart = await this.cartModel.deleteMany({
      user: userId,
      product: productId,
    });

    if (!deleteCart) throw new NotFoundException('Cart not found');
    return `Delete ${deleteCart.deletedCount} product successfully!`;
  }
  async deleteCarts(user: string): Promise<string> {
    const deleteCart = await this.cartModel.deleteMany({ user });
    if (!deleteCart)
      throw new NotFoundException(
        'The product you want to delete does not exist!'
      );
    return `Delete ${deleteCart.deletedCount} product successfully!`;
  }

  async getCarts(user: string) {
    const cartsDB = await this.cartModel.find({ user }).sort({ createdAt: -1 });
    const carts = cartsDB.filter(
      (cart: any) => cart.product?.stock === 'in-stock'
    );
    const cartsOutOfStock = cartsDB.filter(
      (cart: any) => cart.product?.stock === 'out-of-stock'
    );

    return carts;
  }
}
