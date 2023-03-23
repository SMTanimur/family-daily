/* eslint-disable @typescript-eslint/no-explicit-any */
/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthenticatedGuard } from '../auth/guards/authenticated.guard';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart-dto';
import { Cart } from './schemas';
@ApiTags(Cart.name)
@Controller({ path: 'cart', version: '1' })
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({ summary: 'Add new Cart' })
  @ApiCreatedResponse({ description: 'Cart successfully created' })
  @Post()
  @UseGuards(AuthenticatedGuard)
  async AddToCart(@Body() createCartDto: CreateCartDto, @Req() req: any) {
    createCartDto.user = req.user?._id;
    return await this.cartService.addToCart(createCartDto);
  }

  @ApiOperation({ summary: 'get all carts' })
  @ApiOkResponse({ description: 'return all carts' })
  @Get()
  @UseGuards(AuthenticatedGuard)
  // @Roles(Role.ADMIN)
  async getCarts(@Req() req: any) {
    return await this.cartService.getCarts(req.user._id);
  }

  @ApiOperation({ summary: 'Delete' })
  @ApiOkResponse({ description: 'Cart deleted' })
  @Delete(':id')
  @UseGuards(AuthenticatedGuard)
  // @Roles(Role.ADMIN)
  async deleteSingleCart(
    @Param('id') productId:string,
    @Req() req: any
  ) {
    const userId = req.user?._id;
    return await this.cartService.deleteSingleCart(userId,productId);
  }

  @ApiOperation({ summary: ' Delete carts' })
  @ApiOkResponse({ description: 'Carts deleted' })
  @Delete()
  @UseGuards(AuthenticatedGuard)
  // @Roles(Role.ADMIN)
  async deleteCarts(@Req() req: any) {
    return await this.cartService.deleteCarts(req.user._id);
  }
}
