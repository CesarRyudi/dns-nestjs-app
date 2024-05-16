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
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { getDocumentation, getExampleByIdDocumentation, getExport, notImplemented } from './documentation';

@ApiTags('quotes')
@UseGuards(AuthGuard)
@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @applyDecorators(...notImplemented())
  @Post()
  create(@Body() createQuotesDto: CreateQuotesDto) {
    return this.quotesService.create(createQuotesDto);
  }
  @applyDecorators(...notImplemented())
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

  @applyDecorators(...notImplemented())
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

  @applyDecorators(...notImplemented())
  @Patch('id/:id')
  update(@Param('id') id: string, @Body() updateQuotesDto: UpdateQuotesDto) {
    return this.quotesService.update(+id, updateQuotesDto);
  }

  @applyDecorators(...notImplemented())
  @Delete('id/:id')
  remove(@Param('id') id: string) {
    return this.quotesService.remove(+id);
  }
}
