import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { catchError, from, map, of } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto, @Req() {user}) {
    if(user.roles?.indexOf('admin') === -1) throw new UnauthorizedException();
    return from(this.usersService.create(createUserDto)).pipe(
      map((res) => ({
        status: HttpStatus.OK,
        message: 'User created successful',
        data: res,
      }),
      catchError((err) => of({
        status: HttpStatus.PRECONDITION_FAILED,
        message: err.message,
        }))
      ),
    );
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Req() {user}) {
    if(user.roles?.indexOf('admin') === -1) throw new UnauthorizedException();
    return from(this.usersService.findAll()).pipe(
      map((res) => ({
        status: HttpStatus.OK,
        message: 'Users retrieved successful',
        data: res,
      })),
      catchError((err) => of({
        status: HttpStatus.PRECONDITION_FAILED,
        message: err.message,
      })),
    );
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return from(this.usersService.findOne(+id)).pipe(
      map((res) => ({
        status: HttpStatus.OK,
        message: 'User retrieved successful',
        data: res,
      })),
      catchError((err) => of({
        status: HttpStatus.PRECONDITION_FAILED,
        message: err.message,
      })),
    );
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Req() {user}) {
    if(user.roles?.indexOf('admin') === -1 && user.id != id) throw new UnauthorizedException();
    return from(this.usersService.update(+id, updateUserDto)).pipe(
      map((res) => ({
        status: HttpStatus.OK,
        message: 'User updated successful',
        data: res,
      })),
      catchError((err) => of({
        status: HttpStatus.PRECONDITION_FAILED,
        message: err.message,
      })),
    );
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() {user}) {
    if(user.roles?.indexOf('admin') === -1) throw new UnauthorizedException();
    return from(this.usersService.remove(+id)).pipe(
      map((res) => ({
        status: HttpStatus.OK,
        message: 'User deleted successful',
        data: res,
      })),
      catchError((err) => of({
        status: HttpStatus.PRECONDITION_FAILED,
        message: err.message,
      })),
    );
  }
}
