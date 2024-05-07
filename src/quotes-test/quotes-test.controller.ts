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
} from '@nestjs/common';
import { QuotesTestService } from './quotes-test.service';
import { CreateQuotesTestDto } from './dto/create-quotes-test.dto';
import { UpdateQuotesTestDto } from './dto/update-quotes-test.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('quotes-test')
@Controller('quotes-test')
export class QuotesTestController {
  constructor(private readonly quotesTestService: QuotesTestService) {}

  @Post()
  create(@Body() createQuotesTestDto: CreateQuotesTestDto) {
    return this.quotesTestService.create(createQuotesTestDto);
  }

  @Post('csv')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    return this.quotesTestService.uploadFile(file);
  }

  @Get('export/:filter?')
  export(@Res() res: Response, @Param('filter') filter?: string) {
    console.log('Aqui');

    return this.quotesTestService.export(res, filter);
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.quotesTestService.findOne(+id);
  }

  @Get(':take/:skip/:filter?')
  findAll(
    @Param('take') take: string,
    @Param('skip') skip: string,
    @Param('filter') filter?: string,
  ) {
    return this.quotesTestService.findAll(take, skip, filter);
  }

  @Patch('id/:id')
  update(
    @Param('id') id: string,
    @Body() updateQuotesTestDto: UpdateQuotesTestDto,
  ) {
    return this.quotesTestService.update(+id, updateQuotesTestDto);
  }

  @Delete('id/:id')
  remove(@Param('id') id: string) {
    return this.quotesTestService.remove(+id);
  }
}
