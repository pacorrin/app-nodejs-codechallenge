import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { TransactionCreatedKafkaTopicDto } from '../dto/transaction-created-kafka.topic';

@Injectable()
export class TransactionsKafkaProducerService {

  constructor(
    @Inject('TRANSACTIONS_KAFKA_SERVICE') private transactionsKafkaClient: ClientKafka,
  ) { }

  // send transactions.TransactionCreated event to kafka
  async sendTransactionCreatedEvent(transaction: TransactionCreatedKafkaTopicDto) {
    this.transactionsKafkaClient.emit('transactions.TransactionCreated', { value: transaction });
  }

  // send transactions.TransactionStatusUpdate event to kafka
  async sendTransactionStatusUpdate(transaction: { guid: string, status: number }) {
    this.transactionsKafkaClient.emit('transactions.TransactionStatusUpdate', { value: transaction });
  }

}
