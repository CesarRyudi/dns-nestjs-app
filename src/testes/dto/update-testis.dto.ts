import { PartialType } from '@nestjs/mapped-types';
import { CreateTestisDto } from './create-testis.dto';

export class UpdateTestisDto extends PartialType(CreateTestisDto) {}
