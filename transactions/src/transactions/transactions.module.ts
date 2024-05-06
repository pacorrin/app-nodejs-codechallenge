import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsResolver } from './transactions.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { TransactionsKafkaProducerService } from './kafka/transactions-kafka-producer.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TransactionsController } from './transactions.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction]),
    // kafka client configuration
    ClientsModule.register([
      {
        name: 'TRANSACTIONS_KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: process.env?.KAFKA_BROKERS ? process.env.KAFKA_BROKERS.split(',') : ['localhost:9092'],
          },
          producer: {
            allowAutoTopicCreation: true,
          }
        },
      },
    ]),
  ],
  providers: [
    TransactionsResolver,
    TransactionsService,
    TransactionsKafkaProducerService
  ],
  controllers: [TransactionsController]
})
export class TransactionsModule { }
