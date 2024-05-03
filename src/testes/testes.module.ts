import { Module } from '@nestjs/common';
import { TestesService } from './testes.service';
import { TestesController } from './testes.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TestesController],
  providers: [TestesService],
}) 
export class TestesModule {}
 