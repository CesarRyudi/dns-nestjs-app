import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1]; // Extrai o token do cabeçalho Authorization

    if (!token) {
      return false; // Se não houver token, nega o acesso
    }

    try {
      const decodedToken = this.jwtService.verify(token); // Decodifica o token JWT
      const permissions: string[] = decodedToken.permissions;

      // Verifica se o token contém a permissão "role:admin"
      if (permissions && permissions.includes('role:admin')) {
        return true; // Se o usuário tiver a permissão, concede o acesso
      }

      return false; // Se o usuário não tiver a permissão, nega o acesso
    } catch (error) {
      console.error('Erro ao verificar o token:', error);
      return false; // Em caso de erro na verificação do token, nega o acesso
    }
  }
}
