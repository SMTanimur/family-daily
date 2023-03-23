import { AbstractDocument } from '@family-daily/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Brand {
  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  image?: string;

  @Prop({ type: String })
  country?: string;

  @Prop({ type: String, unique: true, slug: 'name', slugPaddingSize: 4 })
  slug: string;

}

export interface BrandDocument extends Brand, AbstractDocument {}

export const BrandSchema = SchemaFactory.createForClass(Brand);
