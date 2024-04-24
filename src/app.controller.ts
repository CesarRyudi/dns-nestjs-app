import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/public')
  public(): string {
    return this.appService.public();
  }

  @UseGuards(AuthGuard)
  @Get('private')
  private(): string {
    return this.appService.private();
  }

  @UseGuards(AuthGuard)
  @Get('weweb')
  wewebTest() {
    return this.appService.wewebTest();
  }
}
