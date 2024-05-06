import ITransactionValidated from "../interfaces/transaction-validated.interface";

export default class TransactionValidated implements ITransactionValidated {
    transactionExternalId: string;
    transactionType: { type: number; name: string; };
    transactionStatus: { status: number; name: string; };
    value: number;
}