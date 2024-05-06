import { Injectable } from '@nestjs/common';
import InputTransactionCreatedEvent from './dto/input-transaction-created-event.dto';
import TransactionValidated from './dto/transaction-validated.dto';
import { getEnumKeyByEnumValue } from 'src/core/helpers/enum.helpers';
import { TransactionStatus } from './enum/transaction-status.enum';

@Injectable()
export class TransactionsValidationService {
    
    // validate transaction value
    validateTransactionValue(transaction: InputTransactionCreatedEvent): TransactionValidated {
        let maxTransactionValue = parseInt(process.env.MAX_TRANSACTION_VALUE) || 1000;
        let newTransactionStatus = transaction.value > maxTransactionValue ? TransactionStatus.REJECTED : TransactionStatus.APPROVED;
        let validatedTransaction = {
            transactionExternalId: transaction.transactionExternalId,
            transactionType: {
                type: transaction.transactionType,
                name: 'TEST TRANSACTION TYPE'
            },
            transactionStatus: {
                status: newTransactionStatus,
                name: getEnumKeyByEnumValue(TransactionStatus, newTransactionStatus)
            },
            value: transaction.value
        }
        return validatedTransaction;
    }
}
