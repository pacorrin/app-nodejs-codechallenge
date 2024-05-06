<p align="center">
  <a  target="blank"><img src="https://www.cloudfoundry.org/wp-content/uploads/icon-microservices-1.png" width="200" alt="Nest Logo" /></a>
</p>

# Anti-Fraud Microservice 

## Description

This microservice have the responsability to validate some transactions characteristics, in this case i only validate the value field based on challenge requirements, but we can validate other fields for accomplish other goals.

## Installation

```bash
$ yarn
$ npm install
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
**Note:** the microservice starts normally but based on the process flow we need to have Transactions Microservice initialized

## Technical specifications

### kafka

#### Consumer groups

```
transactions-anti-fraud-consumer
```

#### Listened topic list

- transactions.TransactionCreated

# Configuration


### Environment variables

```conf
# validations config
MAX_TRANSACTION_VALUE=1000

# KAFKA
KAFKA_BROKERS=localhost:9092
```

# Extra

#### Tech stack

- Typescript
- NestJS
- Kafka