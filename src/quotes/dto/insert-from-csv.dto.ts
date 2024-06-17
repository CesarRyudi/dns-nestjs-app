// insert-multiple-csv.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class InsertFromCsv {
  // @ApiProperty({
  //   example: 'Aloia',
  //   description: `Empresa a quem pertence a cotação.`,
  // })
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  url: string;
}

