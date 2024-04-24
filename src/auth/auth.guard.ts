import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { promisify } from 'util';
import { expressjwt, GetVerificationKey, UnauthorizedError } from 'express-jwt';
import { expressJwtSecret } from 'jwks-rsa';
import { ConfigService } from '@nestjs/config';
import jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private configService: ConfigService){}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.getArgByIndex(0);
    const res = context.getArgByIndex(1);
    
    const checkJWT = promisify(
      expressjwt({
        secret: expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `${this.configService.get('AUTH0_DOMAIN')}.well-known/jwks.json`,
        }) as GetVerificationKey,
        audience: this.configService.get('AUTH0_AUDIENCE'),
        issuer: this.configService.get('AUTH0_DOMAIN'),
        algorithms: ['RS256'],
      }),
    );
    try{
      await checkJWT(req, res);

      const token = req.headers.authorization.split(' ')[1]; 
      console.log(token);
      // const decodedToken = jwt.decode(token);
      // console.log(decodedToken);
      
      return true;

    } catch(error){
      console.log(error);
      throw new UnauthorizedException(error);
    }
  }
}
