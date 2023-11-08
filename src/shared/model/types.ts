import { PokemonTCG } from 'pokemon-tcg-sdk-typescript';

export type searchParamsOptions = 'page' | 'pageSize' | 'q' | 'orderBy';

export type SearchResponse<T> = {
  data: T[];
  count: number;
  totalCount: number;
  pageSize: number;
  page: number;
};

export type CardIdResponse = {
  data: CardData;
};

export type CardData = PokemonTCG.Card & {
  level?: string;
};
