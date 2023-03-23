import { BrandsService } from './brands.service';
import { BrandsController } from './brands.controller';
/*
https://docs.nestjs.com/modules
*/
import { Module } from '@nestjs/common';
import { BrandsRepository } from './brands.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Brand, BrandSchema } from './schemas';

@Module({
  imports: [MongooseModule.forFeature([{ name: Brand.name, schema: BrandSchema }]),],
  controllers: [BrandsController],
  providers: [BrandsService,BrandsRepository],
  exports: [BrandsService,BrandsRepository]
})
export class BrandsModule {}
