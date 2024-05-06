import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
// entities
import { Transaction } from '../../transactions/entities/transaction.entity';

export const PostgresOptions: PostgresConnectionOptions = {
    type: 'postgres',
    host: process?.env?.DB_HOST || 'localhost',
    port: parseInt(process?.env?.DB_PORT || '5432'),
    username: process?.env?.DB_USER || 'postgres',
    password: process?.env?.DB_PASS || 'postgres',
    database: process?.env?.DB_DATABASE || 'transactions',
    // synchronize: true,
    // logging: false,
    entities: [
        Transaction
    ],
};

console.log("PostgresOptions", PostgresOptions);