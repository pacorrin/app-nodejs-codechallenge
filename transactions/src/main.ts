import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // HTTP server (integrated with graphql)
  const app = await NestFactory.create(AppModule, {cors: true});


  //Kafka configuration as consumer
  const kafkaConfig: MicroserviceOptions = {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'transactions-consumer',
      },
      subscribe: {
        fromBeginning: true,
      }
    }
  };
  app.connectMicroservice(kafkaConfig);
  // start all microservicesj
  await app.startAllMicroservices();

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
