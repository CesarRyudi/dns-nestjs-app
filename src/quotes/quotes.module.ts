import { Module } from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { QuotesController } from './quotes.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express-jwt';
@Module({
  controllers: [QuotesController],
  providers: [QuotesService, PrismaService, JwtService],
})
export class QuotesModule {}
