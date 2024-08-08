import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import type { IPeople } from '@shared/types';
import { r2d2 } from './people';

const handlers = [
  http.get<{ id: string }, IPeople, IPeople>(
    'https://swapi.dev/api/people/:id/',
    async () => {
      return HttpResponse.json(r2d2);
    }
  ),
];

export const server = setupServer(...handlers);
