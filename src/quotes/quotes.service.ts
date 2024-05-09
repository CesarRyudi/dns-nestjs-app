import { Injectable } from '@nestjs/common';
import { CreateQuotesDto } from './dto/create-quote.dto';
import { UpdateQuotesDto } from './dto/update-quote.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import * as fastcsv from 'fast-csv';
import { Readable } from 'stream';

@Injectable()
export class QuotesService {
  constructor(private readonly prismaService: PrismaService) {}

  uploadFile(file: any) {
    throw new Error('Method not implemented.');
  }

  create(createQuotesDto: CreateQuotesDto) {

     return this.prismaService.quotesCSV.create({
       data: {
         TABLE: createQuotesDto.TABLE,
         NOME: createQuotesDto.NOME,
         PN: createQuotesDto.PN,
         Date_RFQ: createQuotesDto.Date_RFQ,
         UNIT_money: createQuotesDto.UNIT_money,
         UOM: createQuotesDto.UOM,
         Customer: createQuotesDto.Customer,
         BUYER: createQuotesDto.BUYER,
         DESC: createQuotesDto.DESC,
         QTY: createQuotesDto.QTY,
         PN_ALT: createQuotesDto.PN_ALT,
         DESC_PN_ALT: createQuotesDto.DESC_PN_ALT,
         OEM: createQuotesDto.OEM,
         SOURCE_1: createQuotesDto.SOURCE_1,
         SOURCE_2: createQuotesDto.SOURCE_2,
         SOURCE_3: createQuotesDto.SOURCE_3,
         DATE: createQuotesDto.DATE,
         LT: createQuotesDto.LT,
         REMARKS: createQuotesDto.REMARKS,
         Concluido: createQuotesDto.Concluido,
         Customer_PO: createQuotesDto.Customer_PO,
         TERMS: createQuotesDto.TERMS,
         CURRENCY: createQuotesDto.CURRENCY,
         PRECO_COMPRA: createQuotesDto.PRECO_COMPRA,
         Vendor: createQuotesDto.Vendor,
         AVAILABLE: createQuotesDto.AVAILABLE,
         CONDITION: createQuotesDto.CONDITION,
         VEND_DELIVERY: createQuotesDto.VEND_DELIVERY,
         FINAL_DESTINATION: createQuotesDto.FINAL_DESTINATION,
         OBS: createQuotesDto.OBS,
         PN_Manufacturer: createQuotesDto.PN_Manufacturer,
         Status_Quantum: createQuotesDto.Status_Quantum,
         vendor_PO: createQuotesDto.vendor_PO,
         SO: createQuotesDto.SO,
         money_LUCRO: createQuotesDto.money_LUCRO,
         Total_LUCRO: createQuotesDto.Total_LUCRO,
         Sales_Code: createQuotesDto.Sales_Code,
         ABBREV: createQuotesDto.ABBREV,
         EMAIL: createQuotesDto.EMAIL,
         Cotacao_Quantum: createQuotesDto.Cotacao_Quantum,
       },
     });
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

    const countQuery = this.prismaService.quotesCSV.count(countQueryArgs);
    const dataQuery = this.prismaService.quotesCSV.findMany(query);
    const [count, data] = await Promise.all([countQuery, dataQuery]);

    return { count, data };
  }

  async export(res, filter: string) {
    const query: Prisma.QuotesCSVFindManyArgs = {
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

    try {
      const data = await this.prismaService.quotesCSV.findMany(query);

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=data.csv');

      fastcsv.write(data, { headers: true }).pipe(res);
    } catch (error) {
      res.status(500).send('Erro ao exportar dados como CSV');
    }
  }

  async export2(res, filter: string, pageSize: number = 100) {
    let skip = 0;
    let hasNextPage = true;

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=data.csv');

    const csvStream = fastcsv.format({ headers: true });
    csvStream.pipe(res);

    while (hasNextPage) {
      const query: Prisma.QuotesCSVFindManyArgs = {
        where: {},
        take: pageSize,
        skip: skip,
      };

      if (filter) {
        query.where = {
          OR: [
            { NOME: { contains: filter, mode: 'insensitive' } },
            { Customer: { contains: filter, mode: 'insensitive' } },
            { PN: { contains: filter, mode: 'insensitive' } },
            { DESC: { contains: filter, mode: 'insensitive' } },
          ],
        };
      }

      try {
        const data = await this.prismaService.quotesCSV.findMany(query);

        if (data.length === 0) {
          hasNextPage = false;
        } else {
          data.forEach((row) => csvStream.write(row));
          skip += pageSize;
        }
      } catch (error) {
        res.status(500).send('Erro ao exportar dados como CSV');
        csvStream.end();
      }
    }

    csvStream.end();
  }

  findOne(id: number) {
    return `This action returns a #${id} quotes`;
  }

  update(id: number, updateQuotesDto: UpdateQuotesDto) {
    return `This action updates a #${id} quotes`;
  }

  remove(id: number) {
    return `This action removes a #${id} quotes`;
  }
}
