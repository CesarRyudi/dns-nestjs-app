import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateTestisDto } from './dto/create-testis.dto';
import { UpdateTestisDto } from './dto/update-testis.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class TestesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTestisDto: CreateTestisDto) {

    try{
      const response = await this.prismaService.testes.create({
      data: {
        email: createTestisDto.email,
        content1: createTestisDto.content1,
        content2: createTestisDto.content2,
        content3: createTestisDto.content3,
        numer1: createTestisDto.numer1,
        numer2: createTestisDto.numer2
      },
    });
    return response;
  } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credential taken');
        }
      }
      throw error;
    }
  
  }

  findAll() {
    return this.prismaService.testes.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} testis`;
  }

  update(id: number, updateTestisDto: UpdateTestisDto) {
    return `This action updates a #${id} testis`;
  }

  remove(id: number) {
    return `This action removes a #${id} testis`;
  }
}
