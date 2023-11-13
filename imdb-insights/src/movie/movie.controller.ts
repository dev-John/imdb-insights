import { Controller, Get, Query, Req } from '@nestjs/common';
import { JoiValidationPipe } from 'src/helpers/pipes/joi-validation.pipe';
import { GetMovieInsightsDto } from './dtos/get-movie-insights.dto';
import { MovieService } from './movie.service';
import { GetMovieInsightsValidatorSchema } from './validators/get-movie-insights-validator.schema';
import { Request } from 'express';

@Controller('movie')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get()
  getMovieInsights(
    @Query(new JoiValidationPipe(GetMovieInsightsValidatorSchema))
    data: GetMovieInsightsDto,
    @Req() req: Request,
  ) {
    return this.movieService.getMovieInsights({
      data,
      req: { userIp: req.ip },
    });
  }
}
