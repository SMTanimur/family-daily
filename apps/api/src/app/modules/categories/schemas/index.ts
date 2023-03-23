
import { AbstractDocument } from '@family-daily/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Category {
  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  image?: string;

  @Prop({ type: String, unique: true, slug: 'name', slugPaddingSize: 4 })
  slug: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' ,autopopulate: true})
  parent?: mongoose.Schema.Types.ObjectId;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category',autopopulate:true }] })
  children?: Category[];
}

export interface CategoryDocument extends Category, AbstractDocument {}
export interface CategoryAggregateDocument extends Category, Document {}

export const CategorySchema = SchemaFactory.createForClass(Category);
