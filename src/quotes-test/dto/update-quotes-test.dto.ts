import { PartialType } from '@nestjs/mapped-types';
import { CreateQuotesTestDto } from './create-quotes-test.dto';

export class UpdateQuotesTestDto extends PartialType(CreateQuotesTestDto) {}
