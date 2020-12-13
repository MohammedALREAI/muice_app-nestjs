import { DocumentBuilder } from '@nestjs/swagger';



export const setUpSwagger = (app, SwaggerModule): void => {
  const options = new DocumentBuilder()
    .setTitle('Music Land API')
    .setDescription('This is the official API of Music Land System')
    .setVersion('1.0')
    .addTag('songs, music, albums, artists, musicians, singers, notifications, chats, gateways, rooms, auth, strategies, jwt')
    .build();


  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}
