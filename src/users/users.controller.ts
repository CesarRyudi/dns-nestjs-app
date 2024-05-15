import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, applyDecorators } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AdminGuard } from 'src/auth/admin/admin.guard';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { deleteUser, getUsers, postUser } from './documentation';

@ApiTags('users')
@UseGuards(AuthGuard, AdminGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @applyDecorators(...postUser())
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @applyDecorators(...getUsers())
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @applyDecorators(...deleteUser())
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
