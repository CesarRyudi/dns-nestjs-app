import {
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { UpdateQuotesDto } from './dto/update-quote.dto';
import { CreateQuotesDto } from './dto/create-quote.dto';

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


export const getQuoteUnique = () => [
  ApiResponse({ status: 200, description: 'OK' }),
  ApiResponse({ status: 401, description: 'Não autorizado' }),
  ApiResponse({ status: 404, description: 'Não encontrado' }),

  ApiOperation({
    summary: 'Retorna uma unica linha do banco de dados',
    description: 'Obtém uma linha do banco de dados pelo id.',
  }),
  ApiParam({
    name: 'id',
    description: 'ID da linha  aser obtida',
    type: 'number',
    example: '460025',
  }),
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

export const patchQuotes = () => [
  ApiResponse({ status: 200, description: 'OK' }),
  ApiResponse({ status: 401, description: 'Não autorizado' }),
  ApiResponse({ status: 404, description: 'Não encontrado' }),

  ApiOperation({
    summary: 'Update de linhas',
    description:
      'Atualiza os parametros fornecidos da linha com o ID fornecido. Por ser uma rota de atualização, todos os parametros enviados no body são opcionais.',
  }),
  ApiParam({
    name: 'id',
    description: 'ID da linha a ser alterada',
    type: 'number',
    example: '460036',
  }),
  ApiBody({ type: CreateQuotesDto })
];

export const postQuotes = () => [
  ApiResponse({ status: 200, description: 'OK' }),
  ApiResponse({ status: 401, description: 'Não autorizado' }),
  ApiResponse({ status: 404, description: 'Não encontrado' }),
  
  ApiOperation({
    summary: 'Cria linhas na tabela',
    description: 'Recebe um json com as informações e insere na tabela.',
  }),
];


export const postQuotesMultiple = () => [
  ApiResponse({ status: 200, description: 'OK' }),
  ApiResponse({ status: 401, description: 'Não autorizado' }),
  ApiResponse({ status: 404, description: 'Não encontrado' }),
  
  ApiOperation({
    summary: 'Cria multiplas linhas na tabela',
    description: 'Faz o mesmo que a post quotes, mas insere diversas linhas de uma vez. Recebe um array de objetos.',
  }),
];

export const deleteQuote = () => [
  ApiResponse({ status: 200, description: 'OK' }),
  ApiResponse({ status: 401, description: 'Não autorizado' }),
  ApiResponse({ status: 404, description: 'Não encontrado' }),
  
  ApiOperation({
    summary: 'Deleta uma linha do banco de dados',
    description: 'Recebe um ID e deleta a linha referente àquele id.',
  }),
  ApiParam({
    name: 'id',
    description: 'Id da linha a ser deletada',
    type: 'number',
    example: '460025',
  }),
];


export const notImplemented = () => [
  ApiOperation({
    summary: 'Rota ainda não implementada',
    description: 'Rota ainda não implementada.',
  }),
];