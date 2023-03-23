import { AbstractDocument } from '@family-daily/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Tag {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Type',
    autopopulate: true,
  })
  type: mongoose.Schema.Types.ObjectId;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  details: string;

  @Prop({ type: String, unique: true, slug: 'name', slugPaddingSize: 4 })
  slug: string;
}

export interface TagDocument extends Tag, AbstractDocument {}

export const TagSchema = SchemaFactory.createForClass(Tag);
