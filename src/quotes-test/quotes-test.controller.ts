import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { QuotesTestService } from './quotes-test.service';
import { CreateQuotesTestDto } from './dto/create-quotes-test.dto';
import { UpdateQuotesTestDto } from './dto/update-quotes-test.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('quotes-test')
export class QuotesTestController {
  constructor(private readonly quotesTestService: QuotesTestService) {}

  @Post()
  create(@Body() createQuotesTestDto: CreateQuotesTestDto) {
    return this.quotesTestService.create(createQuotesTestDto);
  }
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file) {
    return this.quotesTestService.uploadFile(file);
  }

  @Get(':take/:skip/:filter?')
  findAll(@Param('take') take: string, @Param('skip') skip: string, @Param('filter') filter?: string,) {
    return this.quotesTestService.findAll(take, skip, filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quotesTestService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuotesTestDto: UpdateQuotesTestDto,
  ) {
    return this.quotesTestService.update(+id, updateQuotesTestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quotesTestService.remove(+id);
  }
}
