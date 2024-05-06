import { Controller, Get } from '@nestjs/common';
import { Ctx, EventPattern, KafkaContext, Payload } from '@nestjs/microservices';
import InputTransactionApproved from './dto/input-transaction-approved.dto';
import InputTransactionRejected from './dto/input-transaction-rejected.dto';
import { TransactionsService } from './transactions.service';
import { TransactionsKafkaProducerService } from './kafka/transactions-kafka-producer.service';
import { faker } from '@faker-js/faker';

@Controller('transactions')
export class TransactionsController {

    constructor(
        private readonly transactionsService: TransactionsService,
        private transactionsKafkaProducerService: TransactionsKafkaProducerService
    ) { }

    @EventPattern('transactions.TransactionApproved')
    async handleTransactionApproved(@Payload() transaction: InputTransactionApproved, @Ctx() context: KafkaContext) {
        // update transaction status to approved
        // console.log('approved', transaction)
        this.transactionsKafkaProducerService.sendTransactionStatusUpdate({
            guid: transaction.transactionExternalId,
            status: transaction.transactionStatus.status
        })
    }

    @EventPattern('transactions.TransactionRejected')
    async handleTransactionRejected(@Payload() transaction: InputTransactionRejected, @Ctx() context: KafkaContext) {
        // update transaction status to rejected
        // console.log('rejected', transaction)
        this.transactionsKafkaProducerService.sendTransactionStatusUpdate({
            guid: transaction.transactionExternalId,
            status: transaction.transactionStatus.status
        })
    }

    @EventPattern('transactions.TransactionStatusUpdate')
    async handleTransactionStatusUpdate(@Payload() transaction: { guid: string, status: number }, @Ctx() context: KafkaContext) {
        // update transaction status
        // console.log('status update', transaction)
        this.transactionsService.updateTransactionStatus(transaction.guid, transaction.status)
    }

    @Get('random')
    getRandomTransaction() {
        return {
            accountExternalIdDebit: faker.string.uuid(),
            accountExternalIdCredit: faker.string.uuid(),
            tranferTypeId: 1,
            value: parseFloat(faker.finance.amount({min: 10, max: 10000}))
        }
    }

}
