import { Injectable } from '@nestjs/common';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { UpdateTransactionInput } from './dto/update-transaction.input';
import { Transaction } from './entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionsKafkaProducerService } from './kafka/transactions-kafka-producer.service';
import { TransactionStatus } from './enums/TransactionStatus.enum';
import { TransactionPagination } from './dto/transaction-pagination.dto';

@Injectable()
export class TransactionsService {

  constructor(
    @InjectRepository(Transaction) private transactionRepository: Repository<Transaction>,
    private readonly transactionsKafkaProducerService: TransactionsKafkaProducerService
  ) { }

  create(createTransactionInput: CreateTransactionInput): Promise<string> {
    return new Promise((resolve, reject) => {
      this.transactionRepository.save(createTransactionInput, { transaction: false })
        .then((result) => {
          if (result?.guid) {
            this.transactionsKafkaProducerService.sendTransactionCreatedEvent({
              transactionExternalId: result.guid,
              value: result.value,
              createdAt: result.createdAt
            });
          }
          resolve(result?.guid || null);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  }

  findAll() {
    return [
      {
        "guid": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
        "accountExternalIdDebit": "123e4567-e89b-12d3-a456-426614174000",
        "accountExternalIdCredit": "987e6543-e21b-12d3-a456-426614174111",
        "tranferTypeId": 1,
        "value": 1500.00
      },
      {
        "guid": "54f3e31d-7c12-426a-a30c-cab7f3a8fd5a",
        "accountExternalIdDebit": "123e4567-e89b-12d3-a456-426614174222",
        "accountExternalIdCredit": "987e6543-e21b-12d3-a456-426614174333",
        "tranferTypeId": 2,
        "value": 2500.50
      },
      {
        "guid": "5ae2e3f5-c57a-4f60-a10b-580c6b8f35f0",
        "accountExternalIdDebit": "123e4567-e89b-12d3-a456-426614174444",
        "accountExternalIdCredit": "987e6543-e21b-12d3-a456-426614174555",
        "tranferTypeId": 1,
        "value": 750.25
      }
    ]
      ;
  }

  findOne(guid: string) {
    return this.transactionRepository.findOneBy({ guid: guid });
  }

  updateTransactionStatus(transactionGuid: string, status: TransactionStatus): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.transactionRepository.update({ guid: transactionGuid }, { status: status })
        .then((result) => {
          resolve(result?.affected > 0);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    })
  }

  async paginateTransactions(page: number, limit: number): Promise<TransactionPagination> {
    const [items, totalCount] = await this.transactionRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      transactions: items,
      totalCount,
      page,
      limit,
    };
  }

}
