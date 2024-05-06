export class TransactionCreatedKafkaTopicDto {
    // transaction guid
    transactionExternalId: string;
    value: number;
    createdAt: String;
}