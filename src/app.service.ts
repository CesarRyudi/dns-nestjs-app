import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private(): string {
    return '******PRIVATE! GET OUT!*********';
  }

  wewebTest(){
    return [
      { id: 1, msg: 'Teste de número 1' },
      { id: 2, msg: 'Teste de número 2' },
      { id: 3, msg: 'Teste de número 3' },
      { id: 4, msg: 'Teste de número 4' },
    ];
  }
}
 