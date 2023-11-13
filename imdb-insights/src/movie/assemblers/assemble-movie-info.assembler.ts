import * as regression from 'regression';
import { AssembleByYearAndMonthResponseType } from '../types/assemble-by-year-and-month-response.type';
import { AssembleViewerSentimentResponseType } from '../types/assemble-viewer-sentiment-response.type';
import { GetMovieReviewsResponseType } from '../types/get-movie-reviews-response.type';

export class MovieInfoAssembler {
  static assembleDataByYearAndMonth(
    data: GetMovieReviewsResponseType[],
  ): AssembleByYearAndMonthResponseType[] {
    const groupedReviews = data.reduce((acc, review) => {
      const submissionDate = new Date(review.submissionDate);
      const year = submissionDate.getFullYear();
      const month = submissionDate.getMonth() + 1;

      const key = `${year}-${month}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(review);
      return acc;
    }, {});

    return groupedReviews as AssembleByYearAndMonthResponseType[];
  }

  static assembleViewerSentiment(
    data: AssembleByYearAndMonthResponseType[],
  ): AssembleViewerSentimentResponseType[] {
    const reviewsArray = Object.entries(data).sort();

    const result = reviewsArray.map(([key, reviews]) => {
      let totalWeightedRelevanceScore = 0;
      let totalWeight = 0;

      for (const review of reviews as unknown as GetMovieReviewsResponseType[]) {
        const { helpfulnessScore, interestingVotes } = review;

        const interestingVotesWeight = Math.min(
          0.75,
          0.4 +
            (interestingVotes.up ||
              0 / (interestingVotes.up || 0 + interestingVotes.down || 0)) *
              0.35,
        );

        const helpfulnessScoreWeight = 1 - interestingVotesWeight;

        const relevanceScore =
          helpfulnessScore * helpfulnessScoreWeight +
          (interestingVotes.up * interestingVotesWeight) /
            (interestingVotes.up || 0 + interestingVotes.down || 0);

        totalWeightedRelevanceScore += relevanceScore;
        totalWeight += 1;
      }

      const averageRelevanceScore = totalWeightedRelevanceScore / totalWeight;

      return {
        [key]: averageRelevanceScore,
      };
    });

    return result;
  }

  static assembleNext12MonthsRegression(
    data: AssembleViewerSentimentResponseType[],
  ) {
    const parsedData = data.map((item) => {
      const key = Object.keys(item)[0];
      const [year, month] = key.split('-');
      return [parseInt(year) + parseInt(month) / 12, Object.values(item)[0]];
    });

    const result = regression.linear(parsedData);

    const currentDate = new Date();

    const predictedSentimentScores = [];

    // Predict the sentiment for next 12 months
    for (let i = 1; i <= 12; i++) {
      const nextDate = new Date(currentDate);
      nextDate.setMonth(currentDate.getMonth() + i);
      const year = nextDate.getFullYear();
      const month = nextDate.getMonth() + 1;
      const predictedValue =
        result.equation[0] * (year + month / 12) + result.equation[1];
      predictedSentimentScores.push({
        date: `${year}-${month.toString().padStart(2, '0')}`,
        score: predictedValue,
      });
    }

    return predictedSentimentScores;
  }
}
