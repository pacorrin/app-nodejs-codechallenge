import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionsValidationModule } from './transactions-validation/transactions-validation.module';

@Module({
  imports: [TransactionsValidationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
