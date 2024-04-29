import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    example: 'teste@teste.com',
    description: `Email que será utilizado para a criação de uma nova conta.`,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
