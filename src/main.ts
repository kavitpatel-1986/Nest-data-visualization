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
      console.log("ORIGIN ",origin)
      if(!origin){
        return callback(null,true)
      }
      if(allowedOrigins.includes(origin)){
        console.log(origin," Allowed")
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
    .setTitle('Data-Visualization API')
    .setDescription('Data-Visualization API description')
    .setVersion('1.0')
    .addTag('Data-Visualization')
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