import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import {
  catchError,
  filter,
  firstValueFrom,
  lastValueFrom,
  map,
  mergeAll,
  toArray,
} from 'rxjs';
import { GetMovieInsightsDto } from '../dtos/get-movie-insights.dto';
import { GetUserReviewsDto } from '../dtos/get-user-reviews.dto';
import { GetMovieReviewsResponseType } from '../types/get-movie-reviews-response.type';
import { IMDBGetMovieReviewsResponseType } from '../types/imdb-get-movie-reviews-response.type';
import { URLs } from 'src/configs/urls';
import { IMDBGetMovieByNameResponseType } from '../types/imdb-get-movie-by-name-response.type';

@Injectable()
export class IMDBService {
  constructor(private http: HttpService) {}

  async getMovieId(data: GetMovieInsightsDto): Promise<string> {
    return firstValueFrom(
      this.http
        .get<IMDBGetMovieByNameResponseType>(URLs.MOVIE_URL, {
          params: { q: data.movieName },
          headers: {
            'X-RapidAPI-Key': process.env.API_KEY,
            'X-RapidAPI-Host': process.env.API_HOST,
          },
        })
        .pipe(
          map((res) => res.data),
          map((res) => res.results),
          mergeAll(),
          filter((result) => {
            console.log(result);
            return result.title.toLowerCase() === data.movieName.toLowerCase();
          }),
          map((result) => result.id.match(/\/title\/(tt[0-9]+)/)[1]),
        )
        .pipe(
          catchError((err) => {
            throw new Error(err.response.data.message);
          }),
        ),
    );
  }

  getMovieReviews({
    movieId,
  }: GetUserReviewsDto): Promise<GetMovieReviewsResponseType[]> {
    return lastValueFrom(
      this.http
        .get<IMDBGetMovieReviewsResponseType>(URLs.REVIEWS_URL, {
          params: { tconst: movieId },
          headers: {
            'X-RapidAPI-Key': process.env.API_KEY,
            'X-RapidAPI-Host': process.env.API_HOST,
          },
        })
        .pipe(
          map(({ data }) => data.reviews),
          mergeAll(),
          map(
            ({
              authorRating,
              helpfulnessScore,
              interestingVotes,
              submissionDate,
            }) => {
              return {
                authorRating,
                helpfulnessScore,
                interestingVotes: {
                  up: interestingVotes?.up || 0,
                  down: interestingVotes?.down || 0,
                },
                submissionDate,
              };
            },
          ),
          toArray(),
        )
        .pipe(
          catchError((err) => {
            throw new Error(err.response.data.message);
          }),
        ),
    );
  }
}
