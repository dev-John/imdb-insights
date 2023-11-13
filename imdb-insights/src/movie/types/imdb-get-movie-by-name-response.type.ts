type Image = {
  height: number;
  id: string;
  url: string;
  width: number;
};

type Role = {
  character: string;
  characterId: string;
};

type Principal = {
  id: string;
  legacyNameText: string;
  name: string;
  category: string;
  characters: string[];
  endYear: number;
  episodeCount: number;
  roles: Role[];
  startYear: number;
};

type Result = {
  id: string;
  image: Image;
  runningTimeInMinutes: number;
  nextEpisode: string;
  numberOfEpisodes: number;
  seriesEndYear: number;
  seriesStartYear: number;
  title: string;
  titleType: string;
  year: number;
  principals: Principal[];
};

export class IMDBGetMovieByNameResponseType {
  results: Result[];
}
