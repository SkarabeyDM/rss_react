import { http, HttpResponse } from 'msw';
import type { IPeople } from '@shared/types';
import { PEOPLE_FIRST_PAGE, PEOPLE_SECOND_PAGE, r2d2 } from './people';

export const handlers = [
  http.get<{ id: string }, IPeople, IPeople>(
    'https://swapi.dev/api/people/:id/',
    async () => {
      return HttpResponse.json(r2d2);
    }
  ),
  http.get('https://swapi.dev/api/people', async ({ request }) => {
    const { searchParams } = new URL(request.url);
    const page = +(searchParams.get('page') ?? 1);

    const response = page > 1 ? PEOPLE_SECOND_PAGE : PEOPLE_FIRST_PAGE;

    return HttpResponse.json(response);
  }),
];
