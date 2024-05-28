import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
  Query,
  Req,
  UseGuards,
  applyDecorators,
} from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { CreateQuotesDto } from './dto/create-quote.dto';
import { UpdateQuotesDto } from './dto/update-quote.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  deleteQuote,
  getDocumentation,
  getExport,
  getQuoteUnique,
  notImplemented,
  patchQuotes,
  postQuotes,
  postQuotesMultiple,
} from './documentation';
import { Express } from 'express';
import { InsertMultipleDto } from './dto/insert-multiple.dto';

@ApiTags('quotes')
@UseGuards(AuthGuard)
@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @applyDecorators(...postQuotes())
  @Post()
  create(@Req() req: Request, @Body() createQuotesDto: CreateQuotesDto) {
    return this.quotesService.create(req, createQuotesDto);
  }

  @applyDecorators(...postQuotesMultiple())
  @Post('multiple')
  createMultiple(
    @Req() req: Request,
    @Body() createQuotesDto: CreateQuotesDto[],
  ) {
    return this.quotesService.createMultiple(req, createQuotesDto);
  }

  @applyDecorators(...notImplemented())
  @Post('consulta_massa')
  async consultaMassa(
    @Req() req: Request,
    @Body() insertMultipleDto: InsertMultipleDto,
  ) {
    return this.quotesService.consultaMassa(req, insertMultipleDto);
  }

  @applyDecorators(...notImplemented())
  @Post('csv/:name')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Req() req: Request,
    @UploadedFile() file,
    @Param('name') name: string,
  ) {
    return this.quotesService.uploadFile(req, file, name);
  }

  @applyDecorators(...getExport())
  @Get('export/:filter?')
  export(@Res() res: Response, @Param('filter') filter?: string) {
    return this.quotesService.export(res, filter);
  }

  @applyDecorators(...getQuoteUnique())
  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.quotesService.findOne(+id);
  }

  @applyDecorators(...getDocumentation())
  @Get(':take/:skip/:filter?')
  findAllInTableAndCompany(
    @Req() req: Request,
    @Param('take') take: string,
    @Param('skip') skip: string,
    @Param('filter') filter?: string,
    @Query('table') table?: string,
  ) {
    return this.quotesService.findAllInTableAndCompany(
      req,
      take,
      skip,
      table,
      filter,
    );
  }

  @applyDecorators(...patchQuotes())
  @Patch('id/:id')
  update(@Param('id') id: string, @Body() updateQuotesDto: UpdateQuotesDto) {
    return this.quotesService.update(+id, updateQuotesDto);
  }

  @applyDecorators(...deleteQuote())
  @Delete('id/:id')
  remove(@Param('id') id: string) {
    return this.quotesService.remove(+id);
  }
}
