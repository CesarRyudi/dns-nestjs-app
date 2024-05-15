import {
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

export const getExampleByIdDocumentation = () => [
  ApiResponse({ status: 200, description: 'OK' }),
  ApiResponse({ status: 401, description: 'Não autorizado' }),
  ApiResponse({ status: 404, description: 'Não encontrado' }),

  ApiOperation({
    summary: 'Detalhes do Exemplo',
    description: 'Obtém detalhes de um exemplo pelo seu ID.',
  }),
  ApiParam({ name: 'id', description: 'ID do ASDASDASASD', type: 'number' }),
];

export const getExport = () => [
  ApiResponse({ status: 200, description: 'OK' }),
  ApiResponse({ status: 401, description: 'Não autorizado' }),
  ApiResponse({ status: 404, description: 'Não encontrado' }),

  ApiOperation({
    summary: 'CSV',
    description:
      'Exporta um csv com todos os dados correspondentes à busca pelo filter. A rota faz uma busca semelhante à busca da rota raiz, e retorna um csv contendo todos os resultados correspondentes encontrados no banco de dados. Se o filter estiver vazio, retorna todos os dados.',
  }),
  ApiParam({
    name: 'filter',
    description:
      'Valor que será buscado no banco de dados (Busca em: Nome, PN, Customer e Desc)',
    type: 'string',
    example: 'ma25',
    required: false
  }),
];

export const notImplemented = () => [
  ApiOperation({
    summary: 'Rota ainda não implementada',
    description: 'Rota ainda não implementada.',
  }),
];

export const getDocumentation = () => [
  ApiResponse({ status: 200, description: 'OK' }),
  ApiResponse({ status: 401, description: 'Não autorizado' }),
  ApiResponse({ status: 404, description: 'Não encontrado' }),

  ApiOperation({
    summary: 'Busca na tabela principal',
    description:
      'Esta rota retorna os dados da tabela principal de forma paginada.',
  }),

  ApiQuery({
    name: 'take',
    description: 'Tamanho da página retornada',
    type: 'number',
    required: true,
    example: 25,
  }),
  ApiQuery({
    name: 'skip',
    description: 'Qual página será retornada',
    type: 'number',
    required: true,
    example: 1,
  }),
  ApiQuery({
    name: 'filter',
    description: 'Filtro da consulta (Busca em: Nome, PN, Customer e Desc)',
    type: 'string',
    required: false,
    example: 'ma25',
  }),
  ApiQuery({
    name: 'table',
    required: false,
    description:
      'Tabela de onde virão os resultados (quotes, partners, sales e inventory)',
    example: 'sales',
  }),
];
