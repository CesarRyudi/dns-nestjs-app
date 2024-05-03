import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AuthGuard)
  @Get('private')
  private(): string {
    return this.appService.private();
  }

  @Get()
  asd(): string {
    return "Hello World!";
  }

  @UseGuards(AuthGuard)
  @Get('weweb')
  wewebTest() {
    return this.appService.wewebTest();
  }
}
