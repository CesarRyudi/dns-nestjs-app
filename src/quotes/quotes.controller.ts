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
} from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { CreateQuotesDto } from './dto/create-quote.dto';
import { UpdateQuotesDto } from './dto/update-quote.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('quotes')
@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Post()
  create(@Body() createQuotesDto: CreateQuotesDto) {
    return this.quotesService.create(createQuotesDto);
  }

  @Post('csv')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    return this.quotesService.uploadFile(file);
  }

  @Get('export/:filter?')
  export(@Res() res: Response, @Param('filter') filter?: string) {
    return this.quotesService.export(res, filter);
  }

  @Get('export2/:filter?')
  export2(@Res() res: Response, @Param('filter') filter?: string) {
    return this.quotesService.export2(res, filter);
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.quotesService.findOne(+id);
  }

  @Get(':take/:skip/:filter?')
  findAll(
    @Req() req: Request,
    @Param('take') take: string,
    @Param('skip') skip: string,
    @Param('filter') filter?: string,
    @Query('table') table?: string,
  ) {
    return this.quotesService.findAll(req, take, skip, table, filter);
  }

  @Patch('id/:id')
  update(@Param('id') id: string, @Body() updateQuotesDto: UpdateQuotesDto) {
    return this.quotesService.update(+id, updateQuotesDto);
  }

  @Delete('id/:id')
  remove(@Param('id') id: string) {
    return this.quotesService.remove(+id);
  }
}
