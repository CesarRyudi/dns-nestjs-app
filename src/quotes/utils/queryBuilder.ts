import { Prisma } from '@prisma/client';
import { FindAllParamsDto } from '../dto/find-all.dto';

// Função para construir a query principal
export function buildQuery(
  params: FindAllParamsDto,
  company: string,
  page: number,
  takeNumber: number,
): Prisma.QuotesCSVFindManyArgs {
  const query: Prisma.QuotesCSVFindManyArgs = {
    skip: page,
    take: takeNumber,
    where: {},
    orderBy: {
      Date_RFQ: 'desc',
    },
  };

  query.where = {
    AND: [
      {
        OR: [
          {
            NOME: {
              contains: params.filter,
              mode: 'insensitive',
            },
          },
          {
            Customer: {
              contains: params.filter,
              mode: 'insensitive',
            },
          },
          {
            PN: {
              contains: params.filter,
              mode: 'insensitive',
            },
          },
          {
            DESC: {
              contains: params.filter,
              mode: 'insensitive',
            },
          },
        ],
      },
      {
        Table: {
          equals: params.table,
          mode: 'insensitive',
        },
      },
      {
        Log_Company: {
          contains: company,
          mode: 'insensitive',
        },
      },
    ],
  };

  return query;
}

// Função para construir a query de contagem
export function buildCountQuery(
  query: Prisma.QuotesCSVFindManyArgs,
): Prisma.QuotesCSVCountArgs {
  return {
    where: query.where,
  };
}
