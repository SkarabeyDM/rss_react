import { type PokemonTCG } from 'pokemon-tcg-sdk-typescript';
import { apiKeyHeader, baseEndpoint, EndpointVariants } from './constants';
import { CardData, CardIdResponse, SearchResponse } from '../types';

export class PokemonAPI {
  static async getCardsByQuery(params: PokemonTCG.Parameter) {
    const endpoint = `${baseEndpoint}${
      EndpointVariants.Cards
    }${this.buildQueryString(params)}`;

    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: apiKeyHeader,
      });

      const data = (await response.json()) as SearchResponse<CardData>;
      return data;
    } catch (error) {
      throw new Error('Failed to fetch data');
    }
  }

  static async getCardById(cardId: string) {
    const endpoint = `${baseEndpoint}${
      EndpointVariants.Cards
    }/${cardId}`;

    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: apiKeyHeader,
      });

      const data = (await response.json()) as CardIdResponse;
      return data;
    } catch (error) {
      throw new Error('Failed to fetch data');
    }
  }

  static buildQueryString = (params: PokemonTCG.Parameter) => {
    const queryArray = [];

    for (const key in params) {
      const value = params[key as keyof PokemonTCG.Parameter];
      if (value !== undefined) {
        queryArray.push(`${key}=${encodeURIComponent(value)}`);
      }
    }

    return `?${queryArray.join('&')}`;
  };
}
