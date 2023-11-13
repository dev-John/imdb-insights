export class GetMovieReviewsResponseType {
  authorRating: number;
  helpfulnessScore: number;
  interestingVotes: {
    up?: number;
    down?: number;
  };
  submissionDate: string;
}
