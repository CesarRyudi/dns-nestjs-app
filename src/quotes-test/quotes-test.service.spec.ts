import { Test, TestingModule } from '@nestjs/testing';
import { QuotesTestService } from './quotes-test.service';

describe('QuotesTestService', () => {
  let service: QuotesTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuotesTestService],
    }).compile();

    service = module.get<QuotesTestService>(QuotesTestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
