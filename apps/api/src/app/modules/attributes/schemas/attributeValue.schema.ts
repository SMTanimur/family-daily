import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type AttributeValueSchema = AttributeValue & Document;
@Schema()
export class AttributeValue {
  @Prop({ required: true })
  name: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Attribute',
  })
  attribute: mongoose.Schema.Types.ObjectId;
}

export const AttributeValueSchema =
  SchemaFactory.createForClass(AttributeValue);
