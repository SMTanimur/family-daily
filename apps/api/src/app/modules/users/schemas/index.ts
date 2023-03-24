import * as bcrypt from 'bcrypt';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';
import { AbstractDocument } from '@family-daily/common';
import { Profile, ProfileSchema } from './profile.schema';
import { Shop } from '../../shops/schemas/shop.shema';
import { Role } from '../../../common/constants/role-enum';


@Schema({ timestamps: true })
export class User {
  // @Prop({ type: [AddressSchema] })
  // addresses?: 


  @Prop({ required: true })
  name: string;


  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;


  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Shop' })
  shop?: Shop;

 
  @Prop({ type: ProfileSchema })
  profile?: Profile;

 
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Shop' }] })
  shops?: Shop[];

 
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Shop' })
  managed_shop?: Shop;

  
  @Prop({ default: true })
  is_active?: boolean;


  @Prop()
  contact?: string;


  @Prop({ default: false })
  email_verified?: boolean;

  @Prop({
    type: String,
    default:Role.CUSTOMER,
    enum: [Role.ADMIN, Role.STAFF, Role.CUSTOMER],
  })
  roles?:Role[]
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
