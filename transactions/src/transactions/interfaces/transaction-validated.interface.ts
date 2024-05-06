export default interface ITransactionValidated {
    transactionExternalId: string,
    transactionType: {
        type: number
        name: string
    },
    transactionStatus: {
        status: number
        name: string
    },
    value: number
}