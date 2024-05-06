<p align="center">
  <a  target="blank"><img src="https://www.cloudfoundry.org/wp-content/uploads/icon-microservices-1.png" width="200" alt="Nest Logo" /></a>
</p>

# Transactions Microservice 

## Description

Microservice for transactions operations. This microsevice has the responsability of transactions operations like find, save and update data.

This project is approached in Pub/Sub pattern using kafka for assure high request traffic. This is verified in a kind of way making stress tests with [Grafana K6](https://k6.io/docs/) tool. 

## Installation

```bash
$ yarn install
$ npm install
```
### Database

```
PostgreSQL
```

#### Database Initialization Script

Before you run the project you need to initializate the database tables with the next sql script.

```sql
-- Table: public.transactions

-- DROP TABLE IF EXISTS public.transactions;

CREATE TABLE IF NOT EXISTS public.transactions
(
    guid uuid NOT NULL DEFAULT uuid_generate_v4(),
    "accountExternalIdDebit" uuid NOT NULL,
    "accountExternalIdCredit" uuid,
    "tranferTypeId" smallint NOT NULL,
    value numeric NOT NULL,
    status smallint DEFAULT 1, -- default PENDING status
    "createdAt" timestamp with time zone DEFAULT now(),
    "updatedAt" timestamp with time zone DEFAULT now(),
    CONSTRAINT transactions_pkey PRIMARY KEY (guid)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.transactions
    OWNER to postgres;

COMMENT ON COLUMN public.transactions.status
    IS '1 = Pending
2 = Approved
3 = Rejected';
```

## Running the app

```bash
# development
$ yarn run start
$ npm start

# watch mode
$ yarn run start:dev
$ npm run start:dev

# production mode
$ yarn run start:prod
$ npm run start:prod
```

## Basic stress test

For testing i used Grafana K6 for a simple stress test to validate high work load.

For run the test we need to install [Grafana K6](https://k6.io/docs/get-started/installation/) and run the script with the command:

```bash
$ k6 run ./k6-transactions-stress-tests.js
```
## Technical specifications

### Kafka

#### Consumer groups

```
transactions-consumer
```

#### Listened topic list

- transactions.TransactionApproved
- transactions.TransactionRejected
- transactions.TransactionStatusUpdate

# Configuration

### Environment variables

```conf
# database config
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_DATABASE=transactions

# KAFKA
KAFKA_BROKERS=localhost:9092
```

# Extra

#### Tech stack

- Typescript
- NestJS
- TypeORM
- Kafka
- GraphQL (Code-First)

#### Testing tech stack

- Grafana K6
- Postman
- GraphQL Playground

## GraphQL Example Queries

##### Create transaction

Query

```graphql
mutation createTransaction($createTransactionInput: CreateTransactionInput!) {
  	createTransaction(createTransactionInput: $createTransactionInput)
}
```

Variables

```json
{
  "createTransactionInput": {
    "accountExternalIdDebit": "c90a5e0b-b2b4-431d-aac5-98409c716397",
    "accountExternalIdCredit": "86edac4e-bb55-4b1f-9ad2-14d1a756d430",
    "tranferTypeId": 1,
    "value": 500
  }
}
```

##### Get transaction by guid

Query

```graphql
query GetTransaction($guid: ID!) {
  transactions(guid: $guid) {
    guid
    accountExternalIdDebit
    accountExternalIdCredit
    tranferTypeId
    value
    status
    createdAt
    updatedAt
  }
}
```

Variables

```json
{
  "guid" : "b4340400-9776-4d7d-8663-c00f0208117a"
}
```

##### Get transactions (paginated)

Query

```graphql
query {
  paginatedTransactions(page: $page, limit: $limit) {
    transactions {
      guid
      accountExternalIdDebit
      accountExternalIdCredit
      tranferTypeId
      value
      status
      createdAt
      updatedAt
    }
    totalCount
    page
    limit
  }
}
```

Variables

```json
{
  "page": 1,
  "limit": 100
}
```