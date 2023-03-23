import * as bcrypt from 'bcrypt';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { Address, AddressSchema } from './address.schema'
import { AbstractDocument } from '@family-daily/common';

@Schema({ timestamps: true })
export class User {
  @Prop({ type: [AddressSchema] })
  addresses?: Types.Array<Address>;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, unique: true, slug: 'name', slugPaddingSize: 4 })
  username?: string;

  @Prop({ type: String })
  phone: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({
    type: String,
    default:
      'https://res.cloudinary.com/muttakinhasib/image/upload/v1611336104/avatar/user_qcrqny.svg',
  })
  avatar?: string;

  @Prop({
    type: String,
    default: 'customer',
    enum: ['admin', 'merchant', 'mechanic', 'customer'],
  })
  role: string;
}

export interface UserDocument extends User, AbstractDocument {
  comparePassword?(password: string): Promise<boolean>;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  const user = this as UserDocument;
  return await bcrypt.compare(password, user.password);
};
