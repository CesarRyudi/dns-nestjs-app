import { Test, TestingModule } from '@nestjs/testing';
import { QuotesTestController } from './quotes-test.controller';
import { QuotesTestService } from './quotes-test.service';

describe('QuotesTestController', () => {
  let controller: QuotesTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuotesTestController],
      providers: [QuotesTestService],
    }).compile();

    controller = module.get<QuotesTestController>(QuotesTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
