import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionsModule } from './transactions/transactions.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresOptions } from './core/database';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    // apollo server driver configuration
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      // playground: false,
    }),
    // typeorm configuration
    TypeOrmModule.forRoot(PostgresOptions),
    // App modules
    TransactionsModule
  ],
})
export class AppModule { }
