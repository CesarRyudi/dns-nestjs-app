import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpService } from '@nestjs/axios';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(private readonly httpService: HttpService) {}

  async create(createUserDto: CreateUserDto) {
    async function getBigToken(httpService) {
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
    const bigToken = await getBigToken(this.httpService);

    const url = 'https://dev-wo5tgznd7ke4vn0q.us.auth0.com/api/v2/users';
    const body = {
      email: createUserDto.email,
      user_metadata: {},
      blocked: false,
      email_verified: false,
      app_metadata: {},
      picture:
        'https://static.wixstatic.com/media/72be19_cac738f7d52045249ad7b37b358a856b~mv2.png/v1/fill/w_28,h_28,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Logo%202_0.png',
      connection: 'DNS-Invite-only-test',
      password: 'Padrao123.',
      verify_email: false,
    };

    const headers = {
      'Authorization': "Bearer "+bigToken,
      'Content-Type': 'application/json',
    };
    console.log(createUserDto);

    try {
      const response = await this.httpService
        .post(url, body, { headers })
        .toPromise();
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer a solicitação POST:', error);
      throw error; 
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
