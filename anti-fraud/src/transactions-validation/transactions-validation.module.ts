import { Module } from '@nestjs/common';
import { TransactionsValidationController } from './transactions-validation.controller';
import { TransactionsValidationService } from './transactions-validation.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TransactionsValidationKafkaProducerService } from './kafka/transactions-validation-kafka-producer.service';

@Module({
    controllers: [TransactionsValidationController],
    providers: [
      TransactionsValidationService,
      TransactionsValidationKafkaProducerService
    ],
    imports: [
        //transactions kafka client
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
    ]
})
export class TransactionsValidationModule {
    
}
