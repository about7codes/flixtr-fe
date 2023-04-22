export interface MovieData {
  page: number;
  results: MovieResult[];
  total_pages: number;
  total_results: number;
}

export interface MovieResult {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: MediaType.Movie;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  runtime: number;
  homepage: string;
  genres: { name: string; id: number }[];
  spoken_languages: { english_name: string; name: string }[];
  status: string;
  revenue: number;
  budget: number;
  imdb_id: string;
}

export enum MediaType {
  Movie = "movie",
  Tv = "tv",
  Person = "person",
}

export interface SeriesData {
  page: number;
  results: SeriesResult[];
  total_pages: number;
  total_results: number;
}

export interface SeriesResult {
  adult: boolean;
  backdrop_path: string;
  id: number;
  name: string;
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string;
  media_type: MediaType.Tv;
  genre_ids: number[];
  popularity: number;
  first_air_date: Date;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
}

export interface PeopleData {
  page: number;
  results: PeopleResult[];
  total_pages: number;
  total_results: number;
}

export interface PeopleResult {
  adult: boolean;
  id: number;
  name: string;
  original_name: string;
  media_type: MediaType.Person;
  popularity: number;
  gender: number;
  known_for_department: KnownForDepartment;
  profile_path: null | string;
  known_for: KnownFor[];
}

export interface KnownFor {
  adult: boolean;
  backdrop_path: null | string;
  id: number;
  name?: string;
  original_language: OriginalLanguage;
  original_name?: string;
  overview: string;
  poster_path: string;
  media_type: KnownForMediaType;
  genre_ids: number[];
  popularity: number;
  first_air_date?: Date;
  vote_average: number;
  vote_count: number;
  origin_country?: string[];
  title?: string;
  original_title?: string;
  release_date?: Date;
  video?: boolean;
}

export enum KnownForMediaType {
  Movie = "movie",
  Tv = "tv",
}

export enum OriginalLanguage {
  En = "en",
  Ja = "ja",
  Kn = "kn",
  Ta = "ta",
  Te = "te",
}

export enum KnownForDepartment {
  Acting = "Acting",
  Directing = "Directing",
}
