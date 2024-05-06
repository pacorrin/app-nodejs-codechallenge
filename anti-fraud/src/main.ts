import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  // await app.listen(3000);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'transactions-anti-fraud-consumer',
        // sessionTimeout: 10000, // 10 segundos
        // heartbeatInterval: 3000, // 3 segundos
      },
      subscribe: {
        fromBeginning: true,
      }
    },

  });

  app.listen();
}
bootstrap();
