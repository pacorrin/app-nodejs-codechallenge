import { Controller, Inject } from '@nestjs/common';
import { Ctx, EventPattern, KafkaContext, Payload } from '@nestjs/microservices';
import InputTransactionCreatedEvent from './dto/input-transaction-created-event.dto';
import TransactionValidatedDto from './dto/transaction-validated.dto';
import { TransactionStatus } from './enum/transaction-status.enum';
import { getEnumKeyByEnumValue } from '../core/helpers/enum.helpers';
import { TransactionsValidationKafkaProducerService } from './kafka/transactions-validation-kafka-producer.service';
import { TransactionsValidationService } from './transactions-validation.service';

@Controller('transactions-validation')
export class TransactionsValidationController {

    constructor(
        private TransactionsValidationKafkaProducerService: TransactionsValidationKafkaProducerService,
        private TransactionsValidationService: TransactionsValidationService
    ){}

    @EventPattern('transactions.TransactionCreated')
    async handleTransactionCreated(@Payload() transaction: InputTransactionCreatedEvent,@Ctx() context: KafkaContext) {
        // console.log('TransactionCreated event received', transaction);
        let validatedTransaction = this.TransactionsValidationService.validateTransactionValue(transaction);
        
        if(validatedTransaction.transactionStatus.status === TransactionStatus.APPROVED){
            // send transaction approved event
            this.TransactionsValidationKafkaProducerService.sendTransactionApprovedEvent({
                ...validatedTransaction,
                createdAt: transaction.createdAt
            });
        }else if(validatedTransaction.transactionStatus.status === TransactionStatus.REJECTED){
            // send transaction rejected event
            this.TransactionsValidationKafkaProducerService.sendTransactionRejectedEvent({
                ...validatedTransaction,
                createdAt: transaction.createdAt
            });
        }

        // if(transaction.value > maxTransactionValue){

        // }

        // console.log('TransactionCreated event received');
        // console.log(data);

        // try {
        //     // Perform the required processing
        //   } catch (e) {
        //     this.kafka.emit('requestTopic', data) // re-add to the back of the queue
        //   }

        
    //   // Confirma manualmente el desplazamiento
    //   const consumer = context.getConsumer();
    //   const topic = context.getTopic();
    //   const partition = context.getPartition();
    //   const offset = Number(context.getMessage().offset) + 1;

    //   await consumer.commitOffsets([{
    //      topic,
    //      partition,
    //      offset: offset.toString(),
    //   }]);
    }

}
