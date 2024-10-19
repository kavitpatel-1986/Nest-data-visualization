import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as session from 'express-session';
import * as passport from 'passport';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

const allowedOrigins = process.env.ALLOWED_ORIGINS

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin:(origin,callback)=>{
      if(!origin){
        return callback(null,true)
      }
      if(allowedOrigins.includes(origin)){
        return callback(null,true)
      }
      callback(new Error('Not allowed by CORS'))
    },
    credentials:true,
    methods:'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    allowedHeaders:'Content-Type,Authorization',
  })
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true, 
    transform: true,  
   }));

  const config = new DocumentBuilder()
    .setTitle('Quote of the Day API')
    .setDescription('The Quote of the Day API description')
    .setVersion('1.0')
    .addTag('quotes')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.use(
    session({
      secret: process.env.SESSION_SECRET|| ' ',
      resave: false,
      saveUninitialized: false,
      cookie: {maxAge:3600000, httpOnly: true ,secure:process.env.NODE_ENV=="production",sameSite:"none"},
    })
  ) 
  app.use(passport.initialize()); 
  app.use(passport.session()); 


  await app.listen(3000);
}
bootstrap();