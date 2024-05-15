import {
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

export const getUsers = () => [
  ApiResponse({ status: 200, description: 'OK' }),
  ApiResponse({ status: 401, description: 'Não autorizado' }),
  ApiResponse({ status: 404, description: 'Não encontrado' }),

  ApiOperation({
    summary: 'Lista usuários',
    description: 'Busca uma lista com todos os usuários cadastrados e retorna seu nome e email.',
  }),
];

export const postUser = () => [
  ApiResponse({ status: 200, description: 'OK' }),
  ApiResponse({ status: 401, description: 'Não autorizado' }),
  ApiResponse({ status: 404, description: 'Não encontrado' }),

  ApiOperation({
    summary: 'Cria usuários',
    description:
      'Cria um usuário com o nome e email fornecidos.',
  }),
];
export const deleteUser = () => [
  ApiResponse({ status: 200, description: 'OK' }),
  ApiResponse({ status: 401, description: 'Não autorizado' }),
  ApiResponse({ status: 404, description: 'Não encontrado' }),

  ApiOperation({
    summary: 'Deleta usuários',
    description:
      'Deleta um usuário.',
  }),
  ApiParam({
    name: 'id',
    description:
      'Id do usuário que será deletado',
    type: 'string',
    example: 'auth | asd75asd567a5d76a5sd ',
    required: false,
  }),
];
