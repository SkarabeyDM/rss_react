export const apiKey = import.meta.env.POKEMON_API_KEY || '';
export const baseEndpoint = 'https://api.pokemontcg.io/v2/';

export const apiKeyHeader = {
  'X-Api-Key': apiKey,
};

export enum EndpointVariants {
  Cards = 'cards',
  Sets = 'sets',
  Types = 'types',
  Subtypes = 'subtypes',
  Supertypes = 'supertypes',
  Rarities = 'rarities',
}
