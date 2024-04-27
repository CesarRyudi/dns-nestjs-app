import { Injectable } from '@nestjs/common';
import { CreateQuotesTestDto } from './dto/create-quotes-test.dto';
import { UpdateQuotesTestDto } from './dto/update-quotes-test.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuotesTestService {
  constructor(private readonly prismaService: PrismaService) {}

  uploadFile(file: any) {
    throw new Error('Method not implemented.');
  }

  create(createQuotesTestDto: CreateQuotesTestDto) {
    return 'This action adds a new quotesTest';
  }

  findAll(take: string, skip: string, filter?: string) {
    const takeNumber = parseInt(take);
    const skipNumber = parseInt(skip);
    const page = skipNumber * takeNumber;

    return this.prismaService.quotesCSV.findMany({
      skip: page,
      take: takeNumber,
      where: {
        NOME: {
          contains: filter,
        },
      },
    });
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
