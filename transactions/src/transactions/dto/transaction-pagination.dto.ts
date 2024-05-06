import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Transaction } from '../entities/transaction.entity';

@ObjectType()
export class TransactionPagination {
    @Field(type => [Transaction])
    transactions: Transaction[];

    @Field(type => Int)
    totalCount: number;

    @Field(type => Int)
    page: number;

    @Field(type => Int)
    limit: number;
}
