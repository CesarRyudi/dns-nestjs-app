import { IsOptional, IsString, IsInt, IsNotEmpty } from 'class-validator';

export class FindAllParamsDto {
  @IsNotEmpty()
  @IsInt()
  take: string;

  @IsNotEmpty()
  @IsInt()
  skip: string;

  @IsOptional()
  @IsString()
  table?: string;

  @IsOptional()
  @IsString()
  filter?: string;

  @IsOptional()
  @IsString()
  _from?: string;

  @IsOptional()
  @IsString()
  _to?: string;
}
