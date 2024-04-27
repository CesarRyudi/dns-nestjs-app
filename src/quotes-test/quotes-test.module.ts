import { Module } from '@nestjs/common';
import { QuotesTestService } from './quotes-test.service';
import { QuotesTestController } from './quotes-test.controller';

@Module({
  controllers: [QuotesTestController],
  providers: [QuotesTestService],
})
export class QuotesTestModule {}
