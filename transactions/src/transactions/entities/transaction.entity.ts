import { Field, Float, ID, Int, ObjectType } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column, OrderedBulkOperation } from "typeorm";
import { TransactionStatus } from "../enums/TransactionStatus.enum";



@Entity("transactions")
@ObjectType()
export class Transaction {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  guid: string;

  @Field(() => ID)
  @Column('uuid')
  accountExternalIdDebit: string;

  @Field(() => ID)
  @Column('uuid')
  accountExternalIdCredit: string;

  @Field(() => Int)
  @Column('smallint')
  tranferTypeId: number;

  @Field(() => Float)
  @Column('numeric')
  value: number;

  @Field(() => Int)
  @Column('smallint')
  status: TransactionStatus;

  @Field(() => String)
  @Column('timestamptz',{ default: 'now()' })
  createdAt: String;

  @Field(() => String)
  @Column('timestamptz', { default: 'now()' })
  updatedAt: String;
}