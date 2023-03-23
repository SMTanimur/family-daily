import { AbstractDocument } from '@family-daily/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
@Schema({ timestamps: true })
export class Cart {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true,
    required: true,
  })
  user: mongoose.Schema.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    autopopulate: true,
    required: true,
  })
  product: mongoose.Schema.Types.ObjectId;

  @Prop({ type: Number, default: 1 })
  quantity: number;

  @Prop({ type: Number, default: 0 })
  total: number;
}

export interface CartDocument extends Cart, AbstractDocument {}

export const CartSchema = SchemaFactory.createForClass(Cart);
