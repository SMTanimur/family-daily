
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as morgan from 'morgan';
import helmet from 'helmet';
import 'colors';
import MongoDBStore from 'connect-mongodb-session';
import  passport from 'passport';
import session from 'express-session';
import {
  ConfigurationService,
  NestHttpExceptionFilter
} from '@family-daily/common';

import { AppModule } from './app/app.module';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const MongoStore = MongoDBStore(session);


async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const configurationService =
      app.get<ConfigurationService>(ConfigurationService);

    // app.use(morgan('common'));
    app.use(helmet());
    app.enableCors({
      credentials: true,
      origin: [configurationService.WEB_URL, configurationService.ADMIN_URL],
    });

    // Enable API versioning
    app.enableVersioning({
      type: VersioningType.URI,
    });

    // Swagger Setup
    const config = new DocumentBuilder()
      .setTitle('Pjese Kembimi - An API for Pjese Kembimi')
      .setDescription(
        'Pjese Kembimi is your source for quality auto parts, advice and accessories. View car care tips, shop online for home delivery, or pick up in one of our 4000 convenient store locations in 30 minutes or less.'
      )
      .setVersion('1.0')
      .addServer(configurationService.API_URL)
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

       // Express session configuration
       app.use(
        session({
          name: configurationService.SESSION_NAME,
          secret: configurationService.SESSION_SECRET_KEY,
          resave: false,
          saveUninitialized: false,
          cookie: {
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            httpOnly: true,
            // TODO: Need to check when it's live on the production server
            // sameSite: ServerConfig.NODE_ENV !== 'production' ? 'none' : 'lax',
            sameSite: 'lax',
            // TODO: Enable secure cookie in production
            secure: false, //|| ServerConfig.NODE_ENV === 'production',
          },
          store: new MongoStore({
            uri: configurationService.MONGODB_URI,
            collection: 'sessions',
            expires: 30 * 24 * 60 * 60 * 1000, // 30 days
          }),
        })
      );
      // Passport configuration
      app.use(passport.initialize());
      app.use(passport.session());

 

    app.useGlobalFilters(new NestHttpExceptionFilter(configurationService));
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    const port = process.env.PORT || 3333;
    await app.listen(port);
    Logger.log(
      ` Alhamdulillah! - Application is running on: http://localhost:${port} 🚀 `
        .bgCyan.black
    );
  } catch (error) {
    Logger.error(`Error: ${error.message}`.red);
    process.exit(1);
  }
}

bootstrap();

