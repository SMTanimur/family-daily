import { Prop,  Schema, SchemaFactory } from '@nestjs/mongoose';


import mongoose, { Document } from 'mongoose';
import { Attribute } from '../../attributes/schemas/attribute.schema';


export interface AttributeGroupDocument
  extends Document,
    mongoose.Types.Subdocument,
    AttributeGroup {}

@Schema({ timestamps: true })
export class AttributeGroup {
  @Prop({ required: true })
  name: string;

  @Prop({ type: String, unique: true, slug: 'name', slugPaddingSize: 4 })
  slug: string;

  @Prop({ type: String, required: true })
  attributes?: Attribute[]
}

export const AttributeGroupSchema =
  SchemaFactory.createForClass(AttributeGroup);
