import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateTestisDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  content1: string;
  content2: string;
  content3?: string;
  numer1: number;
  numer2?: number;
}
