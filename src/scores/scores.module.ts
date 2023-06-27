import { Module } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ScoresController } from './scores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Score } from './entities/score.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [ TypeOrmModule.forFeature([ Score ]), ],
  controllers: [ScoresController],
  providers: [ScoresService, JwtService]
})
export class ScoresModule {}
