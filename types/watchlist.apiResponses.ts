export interface WatchlistData {
  page: number;
  results: MovieWatchlist[] | SeriesWatchlist[];
  total_pages: number;
  total_results: number;
  error?: string;
}

export interface MovieWatchlist {
  _id: string;
  tmdb_id: number;
  media_name: string;
  media_type: WatchlistMediaType.Movie;
  poster_path: string;
  release_date: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export interface SeriesWatchlist {
  _id: string;
  tmdb_id: number;
  media_name: string;
  media_type: WatchlistMediaType.Tv;
  poster_path: string;
  release_date: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export enum WatchlistMediaType {
  Movie = "movie",
  Tv = "tv",
}
