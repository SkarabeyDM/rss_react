import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IPeople } from 'swapi-ts';

export const SWAPI = createApi({
  reducerPath: 'SWAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api' }),
  endpoints: (build) => ({
    getPeopleById: build.query<IPeople, number>({
      query: (id) => ({ url: `/people/${id}/` }),
    }),
  }),
});
