export const API_KEY = import.meta.env.POKEMONTCG_API_KEY || "";
export const BASE_ENDPOINT = "https://api.pokemontcg.io/v2/";

export const API_KEY_HEADER = {
  "X-Api-Key": API_KEY,
};

export enum EndpointVariants {
  Cards = "cards",
  Sets = "sets",
  Types = "types",
  Subtypes = "subtypes",
  Supertypes = "supertypes",
  Rarities = "rarities",
}

export enum Supertype {
  Energy = "Energy",
  Pokemon = "Pok\u00E9mon",
  Trainer = "Trainer",
}
export const SEARCH_TERM_KEY = "searchTermKey";
