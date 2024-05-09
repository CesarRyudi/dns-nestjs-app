// create-quote-csv.dto.ts
import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateQuotesDto {
  @IsNumber()
  @IsNotEmpty()
  TABLE: number;

  @IsNotEmpty()
  @IsString()
  NOME: string;

  @IsNotEmpty()
  @IsString()
  PN: string;

  @IsNotEmpty()
  Date_RFQ: string;

  @IsNotEmpty()
  @IsNumber()
  UNIT_money: number;

  @IsNotEmpty()
  @IsString()
  UOM: string;

  @IsOptional()
  @IsString()
  Customer: string;

  @IsOptional()
  @IsString()
  BUYER: string;

  @IsOptional()
  @IsString()
  DESC: string;

  @IsOptional()
  @IsString()
  QTY: string;

  @IsOptional()
  @IsString()
  PN_ALT: string;

  @IsOptional()
  @IsString()
  DESC_PN_ALT: string;

  @IsOptional()
  @IsString()
  OEM: string;

  @IsOptional()
  @IsString()
  SOURCE_1: string;

  @IsOptional()
  @IsString()
  SOURCE_2: string;

  @IsOptional()
  @IsString()
  SOURCE_3: string;

  @IsOptional()
  @IsString()
  DATE: string;

  @IsOptional()
  @IsString()
  LT: string;

  @IsOptional()
  @IsString()
  REMARKS: string;

  @IsOptional()
  @IsString()
  Concluido: string;

  @IsOptional()
  @IsString()
  Customer_PO: string;

  @IsOptional()
  @IsString()
  TERMS: string;

  @IsOptional()
  @IsString()
  CURRENCY: string;

  @IsOptional()
  @IsString()
  PRECO_COMPRA: string;

  @IsOptional()
  @IsString()
  Vendor: string;

  @IsOptional()
  @IsString()
  AVAILABLE: string;

  @IsOptional()
  @IsString()
  CONDITION: string;

  @IsOptional()
  @IsString()
  VEND_DELIVERY: string;

  @IsOptional()
  @IsString()
  FINAL_DESTINATION: string;

  @IsOptional()
  @IsString()
  OBS: string;

  @IsOptional()
  @IsString()
  PN_Manufacturer: string;

  @IsOptional()
  @IsString()
  Status_Quantum: string;

  @IsOptional()
  @IsString()
  vendor_PO: string;

  @IsOptional()
  @IsString()
  SO: string;

  @IsOptional()
  @IsNumber()
  money_LUCRO: number;

  @IsOptional()
  @IsNumber()
  Total_LUCRO: number;

  @IsOptional()
  @IsString()
  Sales_Code: string;

  @IsOptional()
  @IsString()
  ABBREV: string;

  @IsOptional()
  @IsString()
  EMAIL: string;

  @IsOptional()
  @IsString()
  Cotacao_Quantum: string;
}
