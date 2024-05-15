import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    example: 'Fulano',
    description: `Nome que será atribuido ao usuário.`,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'teste@empresa.com',
    description: `Email que será utilizado para a criação de uma nova conta.`,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
