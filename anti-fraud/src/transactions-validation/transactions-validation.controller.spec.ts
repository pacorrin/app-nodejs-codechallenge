import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsValidationController } from './transactions-validation.controller';

describe('TransactionsValidationController', () => {
  let controller: TransactionsValidationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsValidationController],
    }).compile();

    controller = module.get<TransactionsValidationController>(TransactionsValidationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
