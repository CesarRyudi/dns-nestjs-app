import { PartialType } from '@nestjs/mapped-types';
import { CreateQuotesDto } from './create-quote.dto';

export class UpdateQuotesDto extends PartialType(CreateQuotesDto) {}
