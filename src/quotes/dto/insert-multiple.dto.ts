// insert-multiple-csv.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class InsertMultipleDto {
  // @ApiProperty({
  //   example: 'Aloia',
  //   description: `Empresa a quem pertence a cotação.`,
  // })
  @IsNotEmpty()
  @IsString()
  data: string;

  @IsOptional()
  @IsString()
  table: string;

  @IsNotEmpty()
  @IsNumber()
  take: number;

  @IsNotEmpty()
  @IsNumber()
  skip: number;
}

