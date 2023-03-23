import { AbstractDocument } from '@family-daily/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { AttributeValue } from './attributeValue.schema';

@Schema({ timestamps: true })
export class Attribute {
  @Prop({ type: String })
  name: string;

  @Prop({ type: Boolean, default: false })
  featured: boolean;

  @Prop({ type: String, unique: true, slug: 'name', slugPaddingSize: 4 })
  slug: string;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AttributeValue',
        autopopulate: true,
      },
    ],
  })
  values?: AttributeValue[];
}

export const AttributesSchema = SchemaFactory.createForClass(Attribute);
export interface AttributesDocument extends Attribute, AbstractDocument {}
