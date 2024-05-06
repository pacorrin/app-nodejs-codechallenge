import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsValidationService } from './transactions-validation.service';

describe('TransactionsValidationService', () => {
  let service: TransactionsValidationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionsValidationService],
    }).compile();

    service = module.get<TransactionsValidationService>(TransactionsValidationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
