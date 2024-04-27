import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TestesModule } from './testes/testes.module';
import { QuotesTestModule } from './quotes-test/quotes-test.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    TestesModule,
    QuotesTestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
