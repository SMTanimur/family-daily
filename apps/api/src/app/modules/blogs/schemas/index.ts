import { AbstractDocument } from '@family-daily/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Blog {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true,
  })
  user: mongoose.Schema.Types.ObjectId;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: [String], required: true })
  category: string[];

  @Prop({ type: String })
  image?: string;

  @Prop({ type: String, unique: true, slug: 'title', slugPaddingSize: 4 })
  slug: string;
}

export interface BlogDocument extends Blog, AbstractDocument {}

export const BlogSchema = SchemaFactory.createForClass(Blog);
