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
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { deleteQuote, getDocumentation, getExampleByIdDocumentation, getExport, getQuoteUnique, notImplemented, patchQuotes, postQuotes, postQuotesMultiple } from './documentation';

@ApiTags('quotes')
@UseGuards(AuthGuard)
@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @applyDecorators(...postQuotes())
  @Post()
  create(@Body() createQuotesDto: CreateQuotesDto) {
    return this.quotesService.create(createQuotesDto);
  }
  @applyDecorators(...postQuotesMultiple())
  @Post('multiple')
  createMultiple(@Body() createQuotesDto: CreateQuotesDto[]) {
    return this.quotesService.createMultiple(createQuotesDto);
  }

  @applyDecorators(...notImplemented())
  @Post('csv')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    return this.quotesService.uploadFile(file);
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

