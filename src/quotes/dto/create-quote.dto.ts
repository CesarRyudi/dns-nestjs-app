// create-quote-csv.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateQuotesDto {
  @ApiProperty({
    example: 'Aloia',
    description: `Empresa a quem pertence a cotação.`,
  })
  @IsNotEmpty()
  @IsString()
  Log_Company: string;

  @ApiProperty({
    example: 'Quotes',
    description: `Tabela em que deve ser adicionado.`,
  })
  @IsString()
  @IsNotEmpty()
  Table: string;

  @ApiProperty({
    example: 'Fulano Teste',
    description: `Nome do usuário.`,
  })
  @IsNotEmpty()
  @IsString()
  NOME: string;

  @ApiProperty({
    example: 'TESTE-12345',
    description: `Part Number.`,
  })
  @IsNotEmpty()
  @IsString()
  PN: string;

  @ApiProperty({
    example: '2027-05-16T12:00:00Z',
    description: `Data no formato AAAA-MM-DD:HH:MM.`,
  })
  @IsNotEmpty()
  Date_RFQ: string;

  @ApiProperty({
    example: 10.5,
    description: `Ainda não descrito.`,
  })
  @IsNotEmpty()
  @IsNumber()
  UNIT_money: number;

  @ApiProperty({
    example: 'EA',
    description: `Unidade de medida.`,
  })
  @IsNotEmpty()
  @IsString()
  UOM: string;

  @ApiProperty({
    example: 'Stratton Aviation LLC.',
    description: `Ainda não descrito.`,
    required: false,
  })
  @IsOptional()
  @IsString()
  Customer: string;

  @ApiProperty({
    example: 'Fulano',
    description: `Ainda não descrito.`,
    required: false,
  })
  @IsOptional()
  @IsString()
  BUYER: string;

  @ApiProperty({
    example: 'VALVE SKIN AIR',
    description: `Ainda não descrito.`,
    required: false,
  })
  @IsOptional()
  @IsString()
  DESC: string;

  @ApiProperty({
    example: '1',
    description: `Ainda não descrito.`,
    required: false,
  })
  @IsOptional()
  @IsString()
  QTY: string;

  @ApiProperty({
    example: '',
    description: `Ainda não descrito.`,
    required: false,
  })
  @IsOptional()
  @IsString()
  PN_ALT: string;

  @ApiProperty({
    example: '',
    description: `Ainda não descrito.`,
    required: false,
  })
  @IsOptional()
  @IsString()
  DESC_PN_ALT: string;

  @ApiProperty({
    example: '',
    description: `Ainda não descrito.`,
    required: false,
  })
  @IsOptional()
  @IsString()
  OEM: string;

  @ApiProperty({
    example: '',
    description: `Ainda não descrito.`,
    required: false,
  })
  @IsOptional()
  @IsString()
  SOURCE_1: string;

  @ApiProperty({
    example: '',
    description: `Ainda não descrito.`,
    required: false,
  })
  @IsOptional()
  @IsString()
  SOURCE_2: string;

  @ApiProperty({
    example: '',
    description: `Ainda não descrito.`,
    required: false,
  })
  @IsOptional()
  @IsString()
  SOURCE_3: string;

  @ApiProperty({
    example: '',
    description: `Ainda não descrito.`,
    required: false,
  })
  @IsOptional()
  @IsString()
  DATE: string;

  @ApiProperty({
    example: '',
    description: `Ainda não descrito.`,
    required: false,
  })
  @IsOptional()
  @IsString()
  LT: string;

  @ApiProperty({
    example: '',
    description: `Ainda não descrito.`,
    required: false,
  })
  @IsOptional()
  @IsString()
  REMARKS: string;

  @ApiProperty({
    example: '',
    description: `Ainda não descrito.`,
    required: false,
  })
  @IsOptional()
  @IsString()
  Concluido: string;

  @ApiProperty({
    example: '',
    description: `Ainda não descrito.`,
    required: false,
  })
  @IsOptional()
  @IsString()
  Customer_PO: string;

  @ApiProperty({
    example: '',
    description: `Ainda não descrito.`,
    required: false,
  })
  @IsOptional()
  @IsString()
  TERMS: string;

  @ApiProperty({
    example: '',
    description: `Ainda não descrito.`,
    required: false,
  })
  @IsOptional()
  @IsString()
  CURRENCY: string;

  @ApiProperty({
    example: '',
    description: `Ainda não descrito.`,
    required: false,
  })
  @IsOptional()
  @IsString()
  PRECO_COMPRA: string;

  @ApiProperty({
    example: '',
    description: `Ainda não descrito.`,
    required: false,
  })
  @IsOptional()
  @IsString()
  Vendor: string;

  @ApiProperty({
    example: '',
    description: `Ainda não descrito.`,
    required: false,
  })
  @IsOptional()
  @IsString()
  AVAILABLE: string;

  @ApiProperty({
    example: '',
    description: `Ainda não descrito.`,
    required: false,
  })
  @IsOptional()
  @IsString()
  CONDITION: string;

  @ApiProperty({
    example: '',
    description: `Ainda não descrito.`,
    required: false,
  })
  @IsOptional()
  @IsString()
  VEND_DELIVERY: string;

  @ApiProperty({
    example: '',
    description: `Ainda não descrito.`,
    required: false,
  })
  @IsOptional()
  @IsString()
  FINAL_DESTINATION: string;

  @ApiProperty({
    example: '',
    description: `Ainda não descrito.`,
    required: false,
  })
  @IsOptional()
  @IsString()
  OBS: string;

  @ApiProperty({
    example: '',
    description: `Ainda não descrito.`,
    required: false,
  })
  @IsOptional()
  @IsString()
  PN_Manufacturer: string;

  @ApiProperty({
    example: '',
    description: `Ainda não descrito.`,
    required: false,
  })
  @IsOptional()
  @IsString()
  Status_Quantum: string;

  @ApiProperty({
    example: '',
    description: `Ainda não descrito.`,
    required: false,
  })
  @IsOptional()
  @IsString()
  vendor_PO: string;

  @ApiProperty({
    example: '',
    description: `Ainda não descrito.`,
    required: false,
  })
  @IsOptional()
  @IsString()
  SO: string;

  @ApiProperty({
    example: '',
    description: `Ainda não descrito.`,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  money_LUCRO: number;

  @ApiProperty({
    example: '',
    description: `Ainda não descrito.`,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  Total_LUCRO: number;

  @ApiProperty({
    example: '',
    description: `Ainda não descrito.`,
    required: false,
  })
  @IsOptional()
  @IsString()
  Sales_Code: string;

  @ApiProperty({
    example: '',
    description: `Ainda não descrito.`,
    required: false,
  })
  @IsOptional()
  @IsString()
  ABBREV: string;

  @ApiProperty({
    example: '',
    description: `Ainda não descrito.`,
    required: false,
  })
  @IsOptional()
  @IsString()
  EMAIL: string;

  @ApiProperty({
    example: '',
    description: `Ainda não descrito.`,
    required: false,
  })
  @IsOptional()
  @IsString()
  Cotacao_Quantum: string;
}

