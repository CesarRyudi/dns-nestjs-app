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
import { InsertFromCsv } from './dto/insert-from-csv.dto';
import { PublicGuard } from 'src/auth/public/public.guard';
import { FindAllParamsDto } from './dto/find-all.dto';

@ApiTags('quotes')
@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @applyDecorators(...postQuotes())
  @UseGuards(AuthGuard)
  @Post()
  create(@Req() req: Request, @Body() createQuotesDto: CreateQuotesDto) {
    console.log('-- Controller: create--');

    return this.quotesService.create(req, createQuotesDto);
  }

  @applyDecorators(...postQuotesMultiple())
  @UseGuards(AuthGuard)
  @Post('multiple')
  createMultiple(
    @Req() req: Request,
    @Body() createQuotesDto: CreateQuotesDto[],
  ) {
    console.log('-- Controller: createMultiple--');
    return this.quotesService.createMultiple(req, createQuotesDto);
  }

  @applyDecorators(...notImplemented())
  @UseGuards(AuthGuard)
  @Post('consulta_massa')
  async consultaMassa(
    @Req() req: Request,
    @Body() insertMultipleDto: InsertMultipleDto,
  ) {
    console.log('-- Controller: consultaMassa--');
    return this.quotesService.consultaMassa(req, insertMultipleDto);
  }

  @applyDecorators(...notImplemented())
  @UseGuards(AuthGuard)
  @Post('csv/:name')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Req() req: Request,
    @UploadedFile() file,
    @Param('name') name: string,
  ) {
    console.log('-- Controller: uploadFile--');
    return this.quotesService.uploadFile(req, file, name);
  }

  @applyDecorators(...notImplemented())
  @UseGuards(AuthGuard)
  @Post('csv_weweb')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileFromWeweb(
    @Req() req: Request,
    @Body() insertFromCsv: InsertFromCsv,
  ) {
    console.log('-- Controller: uploadFileFromWeweb--');
    return this.quotesService.uploadFileFromWeweb(req, insertFromCsv);
  }

  @applyDecorators(...getExport())
  @Get('export/:filter?')
  export(
    @Res() res: Response,
    @Param('filter') filter?: string,
  ) {
    console.log('-- Controller: export--');
    return this.quotesService.exportNewATab(res, filter);
  }

  @applyDecorators(...getQuoteUnique())
  @UseGuards(AuthGuard)
  @Get('id/:id')
  findOne(@Param('id') id: string) {
    console.log('-- Controller: findOne--');
    return this.quotesService.findOne(+id);
  }

  @applyDecorators(...getDocumentation())
  @UseGuards(AuthGuard)
  @Get(':take/:skip/:filter?')
  findAllInTableAndCompany(
    @Req() req: Request,
    @Param('take') take: string,
    @Param('skip') skip: string,
    @Param('filter') filter?: string,
    @Query('table') table?: string,
    @Query('_from') _from?: string,
    @Query('_to') _to?: string,
  ) {
    console.log('-- Controller: findAllInTableAndCompany--');
    const params: FindAllParamsDto = {
      take,
      skip,
      table,
      filter,
      _from,
      _to,
    };
    return this.quotesService.findAllInTableAndCompany(req, params);
  }

  @applyDecorators(...patchQuotes())
  @UseGuards(AuthGuard)
  @Patch('id/:id')
  update(@Param('id') id: string, @Body() updateQuotesDto: UpdateQuotesDto) {
    console.log('-- Controller: update--');
    return this.quotesService.update(+id, updateQuotesDto);
  }

  @applyDecorators(...deleteQuote())
  @UseGuards(AuthGuard)
  @Delete('id/:id')
  remove(@Param('id') id: string) {
    console.log('-- Controller: remove--');
    return this.quotesService.remove(+id);
  }
}
