import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as StackTrace from 'stacktrace-js';

@Injectable()
export class LogService {
  private readonly logger = new Logger(LogService.name);

  constructor(private prismaService: PrismaService) {}

  private async getContext(): Promise<string> {
    const stackframes = await StackTrace.get();
    const caller = stackframes[3]; 
    const functionName = caller.functionName || 'anonymous function';
    const fileName = caller.fileName || 'unknown file';
    const lineNumber = caller.lineNumber || 'unknown line';
    return `${fileName}:${lineNumber} - ${functionName}`;
  }

  private async log(
    level: string,
    message: string,
    info?: { path: string; method: string; statusCode: number; stack: string },
  ) {
    const context = await this.getContext();
    this.logger.log(`[${level}] - ${message} - ${context}`);

    const logEntry = await this.prismaService.log.create({
      data: {
        level,
        message,
        context,
        error: info
          ? {
              create: {
                path: info.path,
                method: info.method,
                statusCode: info.statusCode.toString(),
                stack: info.stack,
              },
            }
          : undefined,
      },
    });
  }

  async info(message: string) {
    this.log('INFO', message);
  }

  async error(
    message: string,
    info: { path: string; method: string; statusCode: number; stack: string },
  ) {
    this.log('ERROR', message, info);
  }

  async warn(message: string) {
    this.log('WARN', message);
  }

  async debug(message: string) {
    this.log('DEBUG', message);
  }

  async findAll() {
    return await this.prismaService.log.findMany();
  }
}
