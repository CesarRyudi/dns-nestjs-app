import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotImplementedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class UsersService {
  constructor(private readonly httpService: HttpService) {}

  async getBigToken(httpService) {
    // Busca um token com permissão pra tudo, inclusive criar novos usuários.
    const url = 'https://dev-wo5tgznd7ke4vn0q.us.auth0.com/oauth/token';
    const body = {
      client_id: 'uHraTep2FAn3VrBqND4CdPtWUKrLliym',
      client_secret:
        'BxsHxicFH1by0aYa22F5cGDOFRTyp_kL3qi15dq5CnusGL1Qom-AqrhA4eqIx4kk',
      audience: 'https://dev-wo5tgznd7ke4vn0q.us.auth0.com/api/v2/',
      grant_type: 'client_credentials',
    };

    try {
      const response = await httpService.post(url, body).toPromise();
      return response.data.access_token;
    } catch (error) {
      console.error('Erro ao fazer a solicitação POST:', error);
      throw error;
    }
  }

  async create(createUserDto: CreateUserDto) {
    const bigToken = await this.getBigToken(this.httpService); // Recebe o token master e armazena no bigToken

    const url = 'https://dev-wo5tgznd7ke4vn0q.us.auth0.com/api/v2/users';
    const body = {
      email: createUserDto.email,
      user_metadata: {},
      blocked: false,
      email_verified: false,
      app_metadata: {},
      picture:
        'https://static.wixstatic.com/media/72be19_cac738f7d52045249ad7b37b358a856b~mv2.png/v1/fill/w_28,h_28,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Logo%202_0.png', // Foto padrão pra criação de usuários.
      connection: 'DNS-Invite-only-test',
      password: 'Padrao123.',
      verify_email: false,
    };

    const headers = {
      Authorization: 'Bearer ' + bigToken,
      'Content-Type': 'application/json',
    };

    const passwordBody = {
      email: createUserDto.email,
      connection: 'DNS-Invite-only-test',
    };

    const passwordUrl = 'https://dev-wo5tgznd7ke4vn0q.us.auth0.com/dbconnections/change_password';

    try {
      const response = await this.httpService
        .post(url, body, { headers })
        .toPromise();

        
      const responsePassword = await this.httpService
        .post(passwordUrl, passwordBody, { headers })
        .toPromise();

        console.log(responsePassword);

      return response.data;
    } catch (error) {
      if (error.response.data.statusCode === 409)
        throw new ForbiddenException('Credentials taken');
      else throw new NotImplementedException({ msg: 'Erro desconhecido' });
    }
  }

  async findAll() {
    const bigToken = await this.getBigToken(this.httpService); // Recebe o token master e armazena no bigToken
    const headers = {
      Authorization: 'Bearer ' + bigToken,
      'Content-Type': 'application/json',
    };

    try {
      const url =
        'https://dev-wo5tgznd7ke4vn0q.us.auth0.com/api/v2/users?fields=email,user_id';
      const response = await this.httpService.get(url, { headers }).toPromise();
      return response.data;
    } catch (error) {
      throw new NotImplementedException({ msg: 'Erro desconhecido' });
    }
  }

  async remove(id: string) {
    
    const bigToken = await this.getBigToken(this.httpService); // Recebe o token master e armazena no bigToken
    const headers = {
      Authorization: 'Bearer ' + bigToken,
      'Content-Type': 'application/json',
    };
    
    try {
      const url =
        `https://dev-wo5tgznd7ke4vn0q.us.auth0.com/api/v2/users/${id}`;
      const response = await this.httpService.delete(url, { headers }).toPromise();
      return {msg: `Usuário de id ${id} deletado com sucesso!`};
    } catch (error) {
      throw new NotImplementedException({ msg: 'Erro desconhecido' });
    }
  }
}
