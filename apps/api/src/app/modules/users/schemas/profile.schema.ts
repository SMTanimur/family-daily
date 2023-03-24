import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose, { Document } from 'mongoose';


export type ProfileSchema = Profile & Document;

@Schema()
export class Profile {
  @Prop()
  avatar: string;

  @Prop()
  bio: string;

  @Prop(
    raw({
      type: { type: String },
      link: { type: String },
    }),
  )
  socials: Record<string, any>[];

  
  @Prop()
  contact: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
