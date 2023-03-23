import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export interface AddressDocument
  extends Document,
    mongoose.Types.Subdocument,
    Address {}

@Schema()
export class Address {
  @Prop()
  name: string;

  @Prop()
  company?: string;

  @Prop()
  country: string;

  @Prop()
  street: string;

  @Prop()
  city: string;

  @Prop()
  state: string;

  @Prop()
  postcode: string;

  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop({ type: Boolean, default: false })
  default: boolean;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
