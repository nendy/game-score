import { Controller, Get, Post, Body, UseGuards, Req, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { CreateScoreDto } from './dto/create-score.dto';
import { AuthGuard } from '../auth/auth.guard';
import { catchError, from, map, of } from 'rxjs';

@Controller()
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @UseGuards(AuthGuard)
  @Post('scores')
  create(@Body() {name, score}: CreateScoreDto, @Req() {user}) {
    if(user.roles?.indexOf('admin') === -1 && user.name != name) throw new UnauthorizedException();
    return from(this.scoresService.create({name, score})).pipe(
      map((res) => ({
        status: HttpStatus.OK,
        message: 'Score created successful',
        data: res,
      })),
      catchError((err) => of({
        status: HttpStatus.PRECONDITION_FAILED,
        message: err.message,
      })),
    );
  }

  @UseGuards(AuthGuard)
  @Get('scores')
  findAll(@Req() {user}) {
    if(user.roles?.indexOf('admin') === -1) throw new UnauthorizedException();
    return from(this.scoresService.findAll()).pipe(
      map((res) => ({
        status: HttpStatus.OK,
        message: 'Scores retrieved successful',
        data: res,
      })),
      catchError((err) => of({
        status: HttpStatus.PRECONDITION_FAILED,
        message: err.message,
      })),
    );
  }

  @Get('leaderboard')
  getLeaderBoard() {
    return from(this.scoresService.getLeader()).pipe(
      map((res) => ({
        status: HttpStatus.OK,
        message: 'Leaderboard retrieved successful',
        data: res,
      })),
      catchError((err) => of({
        status: HttpStatus.PRECONDITION_FAILED,
        message: err.message,
      })),
    );
  }
}
