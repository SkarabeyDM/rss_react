import { type PokemonTCG } from 'pokemon-tcg-sdk-typescript';
import { apiKeyHeader, baseEndpoint, EndpointVariants } from './constants';
import { CardData, CardIdResponse, SearchResponse } from '../types';

export const getCardsByQuery = async (params: PokemonTCG.Parameter) => {
  const endpoint = `${baseEndpoint}${EndpointVariants.Cards}${buildQueryString(
    params
  )}`;

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
};

export const getCardById = async (cardId: string) => {
  const endpoint = `${baseEndpoint}${EndpointVariants.Cards}/${cardId}`;

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
};

export const buildQueryString = (params: PokemonTCG.Parameter) => {
  const queryArray = [];

  for (const key in params) {
    const value = params[key as keyof PokemonTCG.Parameter];
    if (value !== undefined) {
      queryArray.push(`${key}=${encodeURIComponent(value)}`);
    }
  }

  return `?${queryArray.join('&')}`;
};
