import { GetMovieReviewsResponseType } from './get-movie-reviews-response.type';

export class AssembleByYearAndMonthResponseType {
  [yearAndMonth: string]: GetMovieReviewsResponseType[];
}
