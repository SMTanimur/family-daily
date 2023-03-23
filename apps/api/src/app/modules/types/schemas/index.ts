import { AbstractDocument } from '@family-daily/common';
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';

import mongoose from 'mongoose';
import { Banner } from './banner.schema';
// import { Attribute, AttributesSchema } from '../../attributes/schemas/attribute.schema';
// import { AttributeGroup } from './attributesGroup.schema';

export interface TypeDocument extends Type, AbstractDocument {}
@Schema({ timestamps: true })
export class Type {
 @Prop({ required: true })
 name: string;

 @Prop({ type: String, unique: true, slug: 'name', slugPaddingSize: 4 })
  slug: string;
  // @Prop({ type: AttributesSchema })
  // attributeGroup?:AttributeGroup

  @Prop({type:[String]})
  promotional_sliders?: string[];

  @Prop()
  image?: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Banner' }] })
  banners?: Banner[];

  @Prop(
    raw({
      isHome: { type: Boolean },
      layoutType: { type: String },
      productCard: { type: String },
    })
  )
  settings?: Record<string, any>;
  
}


export const TypeSchema = SchemaFactory.createForClass(Type);
