/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Type, TypeSchema } from './schemas';
import { Banner, BannerSchema } from './schemas/banner.schema';
import { TypeSetting, TypeSettingSchema } from './schemas/typeSetting.schema';
import { TypesController } from './types.controller';
import { TypeRepository } from './types.repository';
import { TypesService } from './types.service';

@Module({
    imports: [MongooseModule.forFeature([
        { name: Type.name, schema: TypeSchema },
        { name: TypeSetting.name, schema: TypeSettingSchema },
        { name: Banner.name, schema: BannerSchema },
      ]),],
    controllers: [TypesController],
    providers: [TypesService,TypeRepository],
})
export class TypesModule {}
