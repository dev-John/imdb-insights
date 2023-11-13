import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { KafkaService } from 'src/kafka/kafka.service';
import { IMDBService } from './imdb/imdb.service';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';

@Module({
  imports: [HttpModule],
  controllers: [MovieController],
  providers: [MovieService, IMDBService, KafkaService],
})
export class MovieModule {}
