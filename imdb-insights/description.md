# The project

## Service A (Sentiment Analysis Service)

Create a NestJS/Typescript application which analyses user reviews of a movie or TV series and returns a historical
sentiment score for each movie or TV series.

The application should provide a REST endpoint to allow end-users to submit the movie or TV Series they wish to analyse.
The IMDB API is freely available [here](https://rapidapi.com/apidojo/api/imdb8/).

The application should connect to the IMDB API to retrieve the reviews for a given movie or TV series, using only these
two endpoints:

### Find a movie or TV series by title

```typescript
const options = {
  method: 'GET',
  url: 'https://imdb8.p.rapidapi.com/title/find',
  params: { q: 'game of thrones' },
  headers: {
    'X-RapidAPI-Key': 'your_key',
    'X-RapidAPI-Host': 'your_host',
  },
};
```

### Use the ID from the previous endpoint to retrieve the reviews

```typescript
const options = {
  method: 'GET',
  url: 'https://imdb8.p.rapidapi.com/title/get-user-reviews',
  params: {
    tconst: 'tt0944947',
  },
  headers: {
    'X-RapidAPI-Key': 'your_key',
    'X-RapidAPI-Host': 'your_host',
  },
};
```

Once the reviews are retrieved, the application should group them by year and month and on each batch it should analyse
the **viewer sentiment** each monthly period based on the reviews using **only** these properties from each review:

- `authorRating`
- `helpfulnessScore`
- `interestingVotes`

The `helpfulnessScore` and `interestingVotes` should be used to calculate a `relevance` score for each review. The relevance
score will determine the weighted contribution of any particular review to the overall monthly sentiment of the movie or TV series.

The more positive the `helpfulnessScore` the more relevant the review is.

The more positive the `interestingVotes` the more relevaimnt the review is, however the `interestingVotes` contribution towards
relevance should be weighted based on the total number of votes _(where more votes means a larger weighted contribution)_.

The `interestingVotes` will determine between **40%** to **75%** of the final relevance score (based on number of votes).

The `helpfulnessScore` will determine the remaining **25%** to **60%** of the relevance score.

With each monthly sentiment score calculated, the application predict the sentiment score for the next 12 months based on
the historical data using linear regression.

For this existing libraries can optionally be used, e.g. https://tom-alexander.github.io/regression-js/

The application should return the sentiment results via REST API in a manner which you determine to be the most appropriate
and useful for end-users.

## Service B (API Usage Service)

Create a second NestJS/Typescript application which keeps a record of the API requests sent to `Service A` and stores
them in a database. This service should be able to track whenever a user makes a REST API call to `Service A`
and store the:

- Endpoint called
- IP Address of the user
- Timestamp of the request

The way `Service A` sends this data to `Service B` is up to you.

## Extra Points

- Run the applications in docker
- Optimise for performance and scale-ability
