import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  public(): string {
    return 'This is a public route!';
  }

  private(): string {
    return '******PRIVATE! GET OUT!*********';
  }
}
