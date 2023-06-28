import { Injectable } from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Score } from './entities/score.entity';

@Injectable()
export class ScoresService {
  constructor(
    @InjectRepository(Score)
    private readonly scoreRepository: Repository<Score>,
  ) {}

  create(data: CreateScoreDto) {
    const score = new Score();
    score.name = data.name;
    score.score = data.score;
    try {
      return this.scoreRepository.save(score);
    } catch (error) {
      throw error;
    }
  }

  findAll(): Promise<Score[]> {
    return this.scoreRepository.find();
  }

  getLeader(): Promise<Score[]> {
    return this.scoreRepository.createQueryBuilder().orderBy("score", "DESC").limit(10).getMany();
  }

}
