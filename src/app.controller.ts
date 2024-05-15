import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'Ping',
    description:
      'Retorna um Ok. Serve apenas para verificar que a aplicação foi iniciada corretamente e está funcionando.',
  })
  @Get()
  asd(): string {
    return 'Ok';
  }
}
