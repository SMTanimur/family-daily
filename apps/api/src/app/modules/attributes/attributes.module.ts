import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AttributesController } from './attributes.controller';
import { AttributesRepository } from './attributes.repository';
import { AttributesService } from './attributes.service';
import { Attribute, AttributesSchema } from './schemas/attribute.schema';
import { AttributeValue, AttributeValueSchema } from './schemas/attributeValue.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Attribute.name, schema: AttributesSchema },
      { name: AttributeValue.name, schema: AttributeValueSchema }
    ]),
  ],
  controllers: [AttributesController],
  providers: [AttributesService, AttributesRepository],
  exports: [AttributesService, AttributesRepository],
})
export class AttributesModule {}
