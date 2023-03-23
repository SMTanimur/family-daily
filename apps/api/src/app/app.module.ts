import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { AttributesModule } from './modules/attributes/attributes.module';
import { AuthModule } from './modules/auth/auth.module';
import { BlogsModule } from './modules/blogs/blogs.module';
import { BrandsModule } from './modules/brand/brands.module';
import { CartModule } from './modules/cart/cart.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { TagsModule } from './modules/tags/tags.module';
import { TypesModule } from './modules/types/types.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    TagsModule,
    CartModule,
    TypesModule,
    AttributesModule,
    BlogsModule,
    BrandsModule,
    CategoriesModule,
    AuthModule,
    CoreModule,
    // MailModule,
    UsersModule,
    AnalyticsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
