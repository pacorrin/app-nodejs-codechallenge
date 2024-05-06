import { Resolver, Query, Mutation, Args, Int, Float, ID } from '@nestjs/graphql';
import { TransactionsService } from './transactions.service';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { UpdateTransactionInput } from './dto/update-transaction.input';
import { Logger } from '@nestjs/common';
import { TransactionPagination } from './dto/transaction-pagination.dto';

@Resolver(() => Transaction)
export class TransactionsResolver {
  private readonly logger = new Logger("transactions-resolver");
  constructor(private readonly transactionsService: TransactionsService) { }

  @Mutation(() => ID, { nullable: true, name: 'createTransaction'  })
  async createTransaction(@Args('createTransactionInput') createTransactionInput: CreateTransactionInput): Promise<string> {
    try {
      // validate null values
      if(typeof createTransactionInput.value === 'undefined' || createTransactionInput.value === null) {
        return null;
      }
      this.logger.debug(`Received transaction  ${JSON.stringify(createTransactionInput)}`);
      return await this.transactionsService.create(createTransactionInput);
    } catch (error) {
      console.log(error)
      return null;
    }
  }

  @Query(() => [Transaction], { name: 'transactions' })
  findAll() {
    return this.transactionsService.findAll();
  }

  @Query(returns => Transaction, { name: 'transactions' })
  async transactions(@Args('guid', { type: () => ID }) guid: string): Promise<Transaction> {
    return this.transactionsService.findOne(guid);
  }

  @Query(returns => TransactionPagination)
  async paginatedTransactions(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
  ): Promise<TransactionPagination> {
    return this.transactionsService.paginateTransactions(page, limit);
  }

}
