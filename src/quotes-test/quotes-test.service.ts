import { Injectable } from '@nestjs/common';
import { CreateQuotesTestDto } from './dto/create-quotes-test.dto';
import { UpdateQuotesTestDto } from './dto/update-quotes-test.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class QuotesTestService {
  constructor(private readonly prismaService: PrismaService) {}

  uploadFile(file: any) {
    throw new Error('Method not implemented.');
  }

  create(createQuotesTestDto: CreateQuotesTestDto) {
    return 'This action adds a new quotesTest';
  }


async findAll(take: string, skip: string, filter?: string) {
    const takeNumber = parseInt(take);
    const skipNumber = parseInt(skip);
    const page = skipNumber * takeNumber;

    const query: Prisma.QuotesCSVFindManyArgs = {
      skip: page,
      take: takeNumber,
      where: {},
    };

    if (filter) {
      query.where = {
        OR: [
          {
            NOME: {
              contains: filter,
              mode: 'insensitive',
            },
          },
          {
            Customer: {
              contains: filter,
              mode: 'insensitive',
            },
          },
          {
            PN: {
              contains: filter,
              mode: 'insensitive',
            },
          },
          {
            DESC: {
              contains: filter,
              mode: 'insensitive',
            },
          },
        ],
      };
    }

    const countQueryArgs: Prisma.QuotesCSVCountArgs = {
      where: {},
    };

    if (filter) {
      countQueryArgs.where = {
        OR: [
          {
            NOME: {
              contains: filter,
              mode: 'insensitive',
            },
          },
          {
            Customer: {
              contains: filter,
              mode: 'insensitive',
            },
          },
          {
            PN: {
              contains: filter,
              mode: 'insensitive',
            },
          },
          {
            DESC: {
              contains: filter,
              mode: 'insensitive',
            },
          },
        ],
      };
      // console.log('====> ' + countQueryArgs);
    }
 

    // Query para contar o número total de linhas correspondentes aos critérios de filtragem
    const countQuery = this.prismaService.quotesCSV.count(countQueryArgs);

    // Query para obter os dados filtrados 
    const dataQuery = this.prismaService.quotesCSV.findMany(query);

    // Executar ambas as consultas em paralelo
    const [count, data] = await Promise.all([countQuery, dataQuery]);

    return { count, data };
}


  findOne(id: number) {
    return `This action returns a #${id} quotesTest`;
  }

  update(id: number, updateQuotesTestDto: UpdateQuotesTestDto) {
    return `This action updates a #${id} quotesTest`;
  }

  remove(id: number) {
    return `This action removes a #${id} quotesTest`;
  }
}
