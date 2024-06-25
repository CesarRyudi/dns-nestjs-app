import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateQuotesDto } from './dto/create-quote.dto';
import { UpdateQuotesDto } from './dto/update-quote.dto';
import { Prisma, QuotesCSV } from '@prisma/client';
import * as fastcsv from 'fast-csv';
import { Readable } from 'stream';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { InsertMultipleDto } from './dto/insert-multiple.dto';
import { cp } from 'fs';
import { InsertFromCsv } from './dto/insert-from-csv.dto';
import axios from 'axios';
import { FindAllParamsDto } from './dto/find-all.dto';
import { IFindManyQueryParams } from './utils/query-params.interface';
const csv = require('csv-parser');

@Injectable()
export class QuotesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  checkCompany(req) {
    console.log('-- checkCompany --');

    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      const decodedToken = this.jwtService.decode(token); // Decodifica o token JWT
      const permissions: string[] = decodedToken.permissions;
      const companyFull = permissions.filter((perm) =>
        perm.startsWith('company:'),
      )[0];
      const company = companyFull ? companyFull.split(':')[1] : '';

      console.log(`-- Company ${company} --`);

      if (company.length < 1) return 'erro';
      else if (company == 'master') return '';
      else return company;
    }
  }

  async uploadFileFromWeweb(
    req: Express.Request,
    insertFromCsv: InsertFromCsv,
  ) {
    console.log('-- uploadFileFromWeweb --');

    const streamToBuffer = async (stream: Readable): Promise<Buffer> => {
      const chunks: Uint8Array[] = [];
      for await (const chunk of stream) {
        chunks.push(chunk);
      }
      return Buffer.concat(chunks);
    };

    try {
      const response = await axios.get(insertFromCsv.url, {
        responseType: 'arraybuffer',
      });

      const stream = new Readable();
      stream.push(response.data);
      stream.push(null);

      const buffer = await streamToBuffer(stream);

      return await this.uploadFile(req, buffer, insertFromCsv.name, true);

      // return await this.uploadFile(req, fileBuffer, insertFromCsv.name);
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(error);
    }
  }

  async uploadFile(
    req: Express.Request,
    file: any,
    name: string,
    weweb: boolean = false,
  ) {
    console.log('-- uploadFile --');

    const company = await this.checkCompany(req);

    const results = [];

    function extrairNumeros(str: string) {
      return str.replace(/[^\d.-]/g, ''); // Remove todos os caracteres exceto dígitos, ponto e traço
    }

    const stream = new Readable();
    stream.push(weweb ? file : file.buffer);
    stream.push(null);

    return new Promise((resolve, reject) => {
      stream
        .pipe(csv({ separator: ';' }))
        .on('data', (data) => results.push(data))
        .on('end', async () => {
          try {
            let i = 0;
            for (const record of results) {
              const mappedData = {
                Log_Company: company,
                Table: record['Table'],
                NOME: name,
                PN: record.PN,
                UNIT_money:
                  Number(
                    extrairNumeros(record['UNIT_money'].replace(',', '.')),
                  ) || 0,
                UOM: record.UOM,
                Customer: record.Customer,
                BUYER: record.BUYER,
                DESC: record.DESC,
                QTY: record['QTY'],
                PN_ALT: record['PN_ALT'],
                DESC_PN_ALT: record['DESC_PN_ALT'],
                OEM: record.OEM,
                SOURCE_1: record['SOURCE_1'],
                SOURCE_2: record['SOURCE_2'],
                SOURCE_3: record['SOURCE_3'],
                DATE: record.DATE,
                LT: record.LT,
                REMARKS: record.REMARKS,
                Concluido: record.Concluido,
                Customer_PO: record['Customer_PO'],
                TERMS: record.TERMS,
                CURRENCY: record.CURRENCY,
                PRECO_COMPRA: record['PRECO_COMPRA'],
                Vendor: record.Vendor,
                AVAILABLE: record.AVAILABLE,
                CONDITION: record.CONDITION,
                VEND_DELIVERY: record['VEND_DELIVERY'],
                FINAL_DESTINATION: record['FINAL_DESTINATION'],
                OBS: record.OBS,
                PN_Manufacturer: record['PN_Manufacturer'],
                Status_Quantum: record['Status_Quantum'],
                vendor_PO: record['vendor_PO '],
                SO: record.SO,
                money_LUCRO: Number(
                  extrairNumeros(record['money_LUCRO'].replace(',', '.')),
                ),
                Total_LUCRO: Number(
                  extrairNumeros(record['Total_LUCRO'].replace(',', '.')),
                ),
                Sales_Code: record['Sales_Code'],
                ABBREV: record.ABBREV,
                EMAIL: record.EMAIL,
                Cotacao_Quantum: record['Cotacao_Quantum'],
                Customer_PO_Receipt: record['Customer_PO_Receipt'],
                Location: record['Location'],
              };

              const prismaResponse = await this.prismaService.quotesCSV.create({
                data: mappedData,
              });
              console.log(i++);
              console.log(prismaResponse);
            }

            resolve({ message: 'CSV processed successfully' });
          } catch (error) {
            reject({ message: 'Error processing CSV', error });
            throw new InternalServerErrorException(error);
          }
        })
        .on('error', (error) => {
          reject({ message: 'Error reading CSV file', error });
        });
    });
  }

  async create(req: Express.Request, createQuotesDto: CreateQuotesDto) {
    console.log('-- create --');
    const company = this.checkCompany(req);

    return await this.prismaService.quotesCSV.create({
      data: {
        Log_Company: company,
        Table: createQuotesDto.Table,
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

  async createMultiple(
    req: Express.Request,
    createQuotesDtoArray: CreateQuotesDto[],
  ) {
    console.log('-- createMultiple --');
    const createdQuotes: QuotesCSV[] = [];

    for (const createQuotesDto of createQuotesDtoArray) {
      const createdQuote = await this.create(req, createQuotesDto);
      createdQuotes.push(createdQuote);
    }

    return createdQuotes;
  }

  async consultaMassa(
    req: Express.Request,
    insertMultipleDto: InsertMultipleDto,
  ) {
    console.log('-- consultaMassa --');
    const take = insertMultipleDto.take;
    const skipNumber = insertMultipleDto.skip;
    const skip = skipNumber * take;
    const table = insertMultipleDto.table;

    const company = this.checkCompany(req);

    const linhas = insertMultipleDto.data
      .split('\n')
      .filter((linha) => linha.trim() !== '');

    const query: Prisma.QuotesCSVFindManyArgs = {
      skip,
      take,
      orderBy: [
        {
          PN: 'asc', // Campo principal para ordenar
        },
        {
          Date_RFQ: 'desc', // Campo secundário para ordenar em caso de empate
        },
      ],
      where: {
        AND: [
          {
            OR: linhas.map((pn) => ({
              PN: {
                contains: pn,
                mode: 'insensitive',
              },
            })),
          },
          {
            Log_Company: {
              contains: company,
              mode: 'insensitive',
            },
          },
        ],
      },
    };

    if (table) {
      query.where = {
        AND: [
          {
            OR: linhas.map((pn) => ({
              PN: {
                contains: pn,
                mode: 'insensitive',
              },
            })),
          },
          {
            Table: {
              equals: table,
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
    }

    const countQuery: Prisma.QuotesCSVCountArgs = {
      where: {
        AND: [
          {
            OR: linhas.map((pn) => ({
              PN: {
                contains: pn,
                mode: 'insensitive',
              },
            })),
          },
          {
            Log_Company: {
              contains: company,
              mode: 'insensitive',
            },
          },
        ],
      },
    };

    function contDinamica(tabela: string): Prisma.QuotesCSVCountArgs {
      return {
        where: {
          AND: [
            {
              OR: linhas.map((pn) => ({
                PN: {
                  contains: pn,
                  mode: 'insensitive',
                },
              })),
            },
            {
              Table: {
                equals: tabela,
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
        },
      };
    }

    const results = await this.prismaService.quotesCSV.findMany(query);

    const totalRecords = await this.prismaService.quotesCSV.count(countQuery);

    const cont = await this.prismaService.quotesCSV.count(
      contDinamica(insertMultipleDto.table),
    );
    const totalQuotes = await this.prismaService.quotesCSV.count(
      contDinamica('quotes'),
    );
    const totalSales = await this.prismaService.quotesCSV.count(
      contDinamica('sales'),
    );
    const totalInventory = await this.prismaService.quotesCSV.count(
      contDinamica('inventory'),
    );
    const totalPartners = await this.prismaService.quotesCSV.count(
      contDinamica('partners'),
    );
    const totalTestes = await this.prismaService.quotesCSV.count(
      contDinamica('TESTE'),
    );

    return {
      conts: {
        result: totalRecords,
        quotes: totalQuotes,
        sales: totalSales,
        inventory: totalInventory,
        partners: totalPartners,
        testes: totalTestes,
      },
      cont,
      data: results,
    };
  }

  async findAll() {}

  async findAllInTableAndCompany(
    req: Express.Request,
    params: FindAllParamsDto,
  ) {
    console.log('-- findAllInTableAndCompany --');
    const takeNumber = parseInt(params.take);
    const skipNumber = parseInt(params.skip);
    const page = skipNumber * takeNumber;
    const company = this.checkCompany(req);

    function findManyQueryBuilder(
      queryParams: IFindManyQueryParams,
    ): Prisma.QuotesCSVFindManyArgs {
      const myQuery: Prisma.QuotesCSVFindManyArgs = {
        skip: queryParams.skip,
        take: queryParams.take,
        where: {},
        orderBy: queryParams.orderBy,
      };

      if (queryParams.filter) {
        myQuery.where = {
          AND: [
            {
              OR: [
                {
                  NOME: {
                    contains: queryParams.filter,
                    mode: 'insensitive',
                  },
                },
                {
                  Customer: {
                    contains: queryParams.filter,
                    mode: 'insensitive',
                  },
                },
                {
                  PN: {
                    contains: queryParams.filter,
                    mode: 'insensitive',
                  },
                },
                {
                  DESC: {
                    contains: queryParams.filter,
                    mode: 'insensitive',
                  },
                },
              ],
            },
            {
              Table: {
                equals: queryParams.table,
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
      } else {
        myQuery.where = {
          AND: [
            {
              Table: {
                equals: queryParams.table,
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
      }
      return myQuery;
    }

    const query = findManyQueryBuilder({
      company,
      filter: params.filter,
      skip: page,
      take: takeNumber,
      orderBy: {
        Date_RFQ: 'desc',
      },
    });

    
    const countQueryArgs: Prisma.QuotesCSVCountArgs = {
      where: {},
    };

    countQueryArgs.where = query.where;

    const data = await this.prismaService.quotesCSV.findMany(query);

    const count = await this.prismaService.quotesCSV.count(countQueryArgs);

    return {
      count,
      data,
    };
  }

  async export(res, company: string, filter: string, pageSize: number = 100) {
    console.log('-- export --');
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
          AND: [
            {
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
            },
            {
              Log_Company: {
                contains: company,
                mode: 'insensitive',
              },
            },
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

  async exportNewATab(res, filter: string, pageSize: number = 100) {
    console.log('-- exportNewATab --');
    let skip = 0;
    let hasNextPage = true;

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=data.csv');

    const csvStream = fastcsv.format({ headers: true });
    csvStream.pipe(res);

    try {
      while (hasNextPage) {
        const query: Prisma.QuotesCSVFindManyArgs = {
          where: {},
          take: pageSize,
          skip: skip,
        };

        if (filter) {
          query.where = {
            AND: [
              {
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
              },
            ],
          };
        }

        const data = await this.prismaService.quotesCSV.findMany(query);

        if (data.length === 0) {
          hasNextPage = false;
        } else {
          data.forEach((row) => csvStream.write(row));
          skip += pageSize;
        }
      }
    } catch (error) {
      console.error('Erro ao exportar dados como CSV', error);
      if (!res.headersSent) {
        res.status(500).send('Erro ao exportar dados como CSV');
      }
    } finally {
      csvStream.end();
    }
  }

  async exportTest(
    req: Express.Request,
    res,
    filter: string,
    pageSize: number = 100,
  ) {
    console.log('-- exportTest --');
    let skip = 0;
    let hasNextPage = true;
    const company = this.checkCompany(req);

    const countQueryArgs: Prisma.QuotesCSVCountArgs = {
      where: {},
    };

    if (filter) {
      countQueryArgs.where = {
        AND: [
          {
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
          },
          {
            Log_Company: {
              contains: company,
              mode: 'insensitive',
            },
          },
        ],
      };
    } else {
      countQueryArgs.where = {
        AND: [
          {
            Log_Company: {
              contains: company,
              mode: 'insensitive',
            },
          },
        ],
      };
    }
    const totalCount = await this.prismaService.quotesCSV.count(countQueryArgs);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=data.csv');
    res.setHeader('X-Total-Count', totalCount.toString());

    const csvStream = fastcsv.format({ headers: true });
    csvStream.pipe(res);

    try {
      while (hasNextPage) {
        const query: Prisma.QuotesCSVFindManyArgs = {
          where: {},
          take: pageSize,
          skip: skip,
        };

        if (filter) {
          query.where = {
            AND: [
              {
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
              },
              {
                Log_Company: {
                  contains: company,
                  mode: 'insensitive',
                },
              },
            ],
          };
        } else {
          query.where = {
            AND: [
              {
                Log_Company: {
                  contains: company,
                  mode: 'insensitive',
                },
              },
            ],
          };
        }

        const data = await this.prismaService.quotesCSV.findMany(query);

        if (data.length === 0) {
          hasNextPage = false;
        } else {
          data.forEach((row) => csvStream.write(row));
          skip += pageSize;
        }
      }
    } catch (error) {
      console.error('Erro ao exportar dados como CSV', error);
      if (!res.headersSent) {
        res.status(500).send('Erro ao exportar dados como CSV');
      }
    } finally {
      csvStream.end();
    }
  }

  async findOne(id: number) {
    console.log('-- findOne --');
    return await this.prismaService.quotesCSV.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateQuotesDto: UpdateQuotesDto) {
    console.log('-- update --');
    return this.prismaService.quotesCSV.update({
      where: { id },
      data: updateQuotesDto,
    });
  }

  async remove(id: number) {
    console.log('-- remove --');
    return await this.prismaService.quotesCSV.delete({
      where: { id },
    });
  }
}
