import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import TransactionApproved from '../dto/transaction-approved.dto';
import TransactionRejected from '../dto/transaction-rejected.dto';

@Injectable()
export class TransactionsValidationKafkaProducerService {

  constructor(
    @Inject('TRANSACTIONS_KAFKA_SERVICE') private transactionsKafkaClient: ClientKafka,
  ) { }

  // send transactions.TransactionApproved event to kafka
  async sendTransactionApprovedEvent(transaction: TransactionApproved) {
    this.transactionsKafkaClient.emit('transactions.TransactionApproved', {value: transaction});
  }

  // send transactions.TransactionRejected event to kafka
  async sendTransactionRejectedEvent(transaction: TransactionRejected) {
    this.transactionsKafkaClient.emit('transactions.TransactionRejected', {value: transaction});
  }

}
