import ITransactionValidated from "../interfaces/transaction-validated.interface";

export default class InputAntiFraudValidatedTransaction implements  ITransactionValidated {
    transactionExternalId: string;
    transactionType: { type: number; name: string; };
    transactionStatus: { status: number; name: string; };
    value: number;
}