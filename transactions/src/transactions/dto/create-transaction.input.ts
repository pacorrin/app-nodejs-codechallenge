import { InputType, Field, ID, Int, Float } from '@nestjs/graphql';

@InputType()
export class CreateTransactionInput {
  @Field(() => ID)
  accountExternalIdDebit: string;

  @Field(() => ID)
  accountExternalIdCredit: string;

  @Field(() => Int)
  tranferTypeId: number;

  @Field(() => Float, {nullable: true})
  value: number;
}