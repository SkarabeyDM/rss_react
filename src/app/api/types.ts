import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

export type searchParamsOptions = 'page' | 'pageSize' | 'q' | 'orderBy';

export type searchParams = {
  [key in searchParamsOptions]: string;
};

export type SearchResponse<T> = {
  data: T[];
  count: number;
  totalCount: number;
  pageSize: number;
  page: number;
};

export type CardData = PokemonTCG.Card & {
  level?: string;
};
