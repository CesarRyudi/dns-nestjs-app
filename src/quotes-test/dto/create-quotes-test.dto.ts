import { IsString, IsDate, IsNumber, IsOptional } from 'class-validator';

export class CreateQuotesTestDto {
  @IsString()
  Status: string;

  @IsDate()
  DATA_RECEIVED: Date;

  @IsDate()
  END_DATE: Date;

  @IsString()
  SELLER: string;

  @IsString()
  id_item: string;

  @IsString()
  CUSTOMER: string;

  @IsString()
  BUYER: string;

  @IsString()
  PN: string;

  @IsString()
  IW: string;

  @IsString()
  Check_PN: string;

  @IsString()
  DESCRIPTION: string;

  @IsNumber()
  QTY: number;

  @IsString()
  UOM: string;

  @IsString()
  SOURCE: string;

  @IsNumber()
  LT_BUSINESS: number;

  @IsString()
  REMARKS: string;

  @IsNumber()
  UNIT_COST: number;

  @IsNumber()
  TOTAL_COST: number;

  @IsNumber()
  FRETE: number;

  @IsNumber()
  Total_Frete: number;

  @IsNumber()
  Sales_Projection: number;

  @IsNumber()
  SALES_UNIT: number;

  @IsNumber()
  TOTAL_SALES: number;

  @IsNumber()
  PROFT: number;

  @IsNumber()
  PROFT_percentage: number;

  @IsNumber()
  Commission_5percente: number;

  @IsString()
  PO_Cliente: string;

  @IsDate()
  Data_Recebimento_PO: Date;

  @IsString()
  PROVEDOR: string;

  @IsString()
  SO_Cliente: string;

  @IsString()
  PO_Provedor: string;

  @IsString()
  Invoice_Provedor: string;

  @IsString()
  Tracking_Number: string;

  @IsDate()
  Promised_Date: Date;

  @IsDate()
  Invoice_Cliente: Date;

  @IsDate()
  DATA_POD: Date;

  @IsDate()
  Previsao_Pagamento: Date;

  @IsDate()
  Previsao_Pagamento_Comissao: Date;

  @IsString()
  Entregue: string;

  @IsString()
  Customer_PO: string;

  @IsNumber()
  PRECO_COMPRA: number;

  @IsString()
  CONDITION: string;

  @IsString()
  OBS: string;

  @IsString()
  vendor_PO: string;

  @IsString()
  SO: string;

  @IsString()
  PN_IW: string;

  @IsNumber()
  Unit_Price: number;

  @IsString()
  Condition: string;

  @IsString()
  Empresa: string;

  @IsString()
  Seller: string;

  @IsDate()
  Quote_Date: Date;
}
