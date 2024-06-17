import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class PublicGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    console.log('Public route ----------------------------------');
    
    return true;
  }
}
