import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IPeople } from '@shared/types';

export interface SwapiSearchResult<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface SwapiSearchParams {
  search: string;
  page: number;
}
export const SWAPI = createApi({
  reducerPath: 'SWAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api' }),
  endpoints: (build) => ({
    getPeopleById: build.query<IPeople, number>({
      query: (id) => ({ url: `/people/${id}/` }),
    }),
    getPeopleBySearch: build.query<
      SwapiSearchResult<IPeople>,
      SwapiSearchParams
    >({
      query: ({ search, page }) => ({
        url: `/people`,
        params: { search, page },
      }),
    }),
  }),
});
