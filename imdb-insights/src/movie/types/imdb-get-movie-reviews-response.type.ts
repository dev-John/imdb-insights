type Author = {
  displayName: string;
  userId: string;
};

type InterestingVotes = {
  down: number;
  up: number;
};

type Review = {
  author: Author;
  authorRating: number;
  helpfulnessScore: number;
  id: string;
  interestingVotes: InterestingVotes;
  languageCode: string;
  reviewText: string;
  reviewTitle: string;
  spoiler: boolean;
  submissionDate: string;
  titleId: string;
};

export type IMDBGetMovieReviewsResponseType = {
  reviews: Review[];
};
