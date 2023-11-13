import * as Joi from 'joi';

export const GetMovieInsightsValidatorSchema = Joi.object({
  movieName: Joi.string().required(),
});
