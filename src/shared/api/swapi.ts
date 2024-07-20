import type {
  IFilm,
  IPeople,
  IPlanet,
  ISpecie,
  IStarship,
  IVehicle,
} from 'swapi-ts';
import { ResourcesType } from 'swapi-ts';

type SwapiSearchResult<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

const SW_LS_KEY = 'swCache';

async function request(url: string) {
  const cached = localStorage.getItem(`${SW_LS_KEY}.${url}`);
  if (cached) {
    return JSON.parse(cached);
  }

  const headers = {
    headers: {
      accept: 'application/json',
    },
  };
  const result = await fetch(url, headers).then((res) => res.json());

  localStorage.setItem(`${SW_LS_KEY}.${url}`, JSON.stringify(result));

  return result;
}

class SwapiCategory<T> {
  readonly endpoint: string;

  constructor(readonly resource: ResourcesType) {
    this.endpoint = `https://swapi.dev/api/${resource}/`;
  }

  async search(searchTerm?: string, page = 1): Promise<SwapiSearchResult<T>> {
    let response;
    if (searchTerm) {
      response = request(`${this.endpoint}?page=${page}&search=${searchTerm}`);
    }
    response = request(`${this.endpoint}?page=${page}`);

    return response;
  }

  async get(id: number): Promise<T> {
    return request(`${this.endpoint}${id}`);
  }
}

export const People = new SwapiCategory<IPeople>(ResourcesType.People);
export const Films = new SwapiCategory<IFilm>(ResourcesType.Films);
export const Planets = new SwapiCategory<IPlanet>(ResourcesType.Planets);
export const Species = new SwapiCategory<ISpecie>(ResourcesType.Species);
export const Vehicles = new SwapiCategory<IVehicle>(ResourcesType.Vehicles);
export const Starships = new SwapiCategory<IStarship>(ResourcesType.Starships);
