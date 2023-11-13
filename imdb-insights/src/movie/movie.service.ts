import { Injectable } from '@nestjs/common';
import { KafkaService } from 'src/kafka/kafka.service';
import { MovieInfoAssembler } from './assemblers/assemble-movie-info.assembler';
import { GetMovieInsightsDto } from './dtos/get-movie-insights.dto';
import { IMDBService } from './imdb/imdb.service';
import { AbstractRequestType } from 'src/types/abstract-request-type';

@Injectable()
export class MovieService {
  constructor(
    private readonly imdbService: IMDBService,
    private kafkaService: KafkaService,
  ) {}

  async getMovieInsights({
    data,
    req,
  }: AbstractRequestType<GetMovieInsightsDto>) {
    await this.kafkaService.sendMessage(
      'imdb-insights',
      JSON.stringify({
        endpoint: '/movie',
        date: new Date().toISOString(),
        ip: req.userIp,
      }),
    );

    // TODO - Add a cache layer here

    const movieId = await this.imdbService.getMovieId(data);
    const result = await this.imdbService.getMovieReviews({ movieId });

    const assembledRes = MovieInfoAssembler.assembleDataByYearAndMonth(result);
    const assembledViewerSentiment =
      MovieInfoAssembler.assembleViewerSentiment(assembledRes);

    const finalResult = MovieInfoAssembler.assembleNext12MonthsRegression(
      assembledViewerSentiment,
    );

    return finalResult;
  }
}
