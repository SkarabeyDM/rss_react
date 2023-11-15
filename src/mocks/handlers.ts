import { HttpResponse, PathParams, delay, http } from 'msw';
import type { CardData, SearchResponse } from '../shared/model';

type CardIdRequestParams = PathParams & {
  id: string;
};

const response: SearchResponse<CardData> = {
  data: [
    {
      id: 'ex13-8',
      name: 'Gyarados δ',
      supertype: 'Pokémon',
      subtypes: ['Stage 1'],
      hp: '90',
      types: ['Lightning', 'Metal'],
      evolvesFrom: 'Magikarp',
      rules: ['This Pokémon is both Lightning Metal type.'],
      abilities: [
        {
          name: 'Delta Reactor',
          text: 'As long as any Stadium card with Holon in its name is in play, each of your Pokémon that has δ on its card does 10 more damage to the Defending Pokémon (before applying Weakness and Resistance).',
          type: 'Poké-Body',
        },
      ],
      attacks: [
        {
          name: 'Hyper Beam',
          cost: ['Metal', 'Colorless'],
          convertedEnergyCost: 2,
          damage: '20',
          text: 'Flip a coin. If heads, discard an Energy card attached to the Defending Pokémon.',
        },
        {
          name: 'Heavy Impact',
          cost: ['Lightning', 'Metal', 'Colorless', 'Colorless', 'Colorless'],
          convertedEnergyCost: 5,
          damage: '80',
          text: '',
        },
      ],
      weaknesses: [
        {
          type: 'Lightning',
          value: '×2',
        },
      ],
      retreatCost: ['Colorless', 'Colorless'],
      convertedRetreatCost: 2,
      set: {
        id: 'ex13',
        name: 'Holon Phantoms',
        series: 'EX',
        printedTotal: 110,
        total: 111,
        legalities: { unlimited: 'Legal' },
        ptcgoCode: 'HP',
        releaseDate: '2006/05/01',
        updatedAt: '2018/03/04 10:35:00',
        images: {
          symbol: 'https://images.pokemontcg.io/ex13/symbol.png',
          logo: 'https://images.pokemontcg.io/ex13/logo.png',
        },
      },
      number: '8',
      artist: 'Hajime Kusajima',
      rarity: 'Rare Holo',
      nationalPokedexNumbers: [130],
      images: {
        small: 'https://images.pokemontcg.io/ex13/8.png',
        large: 'https://images.pokemontcg.io/ex13/8_hires.png',
      },
      tcgplayer: {
        url: 'https://prices.pokemontcg.io/tcgplayer/ex13-8',
        updatedAt: '2023/11/14',
        prices: {
          holofoil: {
            low: 36.99,
            mid: 58.99,
            high: 82.95,
            market: 60.03,
            directLow: 51.74,
          },
          reverseHolofoil: {
            low: 39.99,
            mid: 74.86,
            high: 166.0,
            market: 71.76,
            directLow: null,
          },
        },
      },
    },
    {
      id: 'swsh4-7',
      name: 'Yanmega',
      supertype: 'Pokémon',
      subtypes: ['Stage 1'],
      hp: '130',
      types: ['Grass'],
      evolvesFrom: 'Yanma',
      attacks: [
        {
          name: 'U-turn',
          cost: ['Colorless', 'Colorless'],
          convertedEnergyCost: 2,
          damage: '50',
          text: 'You may switch this Pokémon with 1 of your Benched Pokémon.',
        },
        {
          name: 'Cutting Wind',
          cost: ['Colorless', 'Colorless', 'Colorless', 'Colorless'],
          convertedEnergyCost: 4,
          damage: '130',
          text: '',
        },
      ],
      weaknesses: [
        {
          type: 'Fire',
          value: '×2',
        },
      ],
      set: {
        id: 'swsh4',
        name: 'Vivid Voltage',
        series: 'Sword & Shield',
        printedTotal: 185,
        total: 203,
        legalities: {
          unlimited: 'Legal',
          expanded: 'Legal',
        },
        ptcgoCode: 'VIV',
        releaseDate: '2020/11/13',
        updatedAt: '2020/11/13 16:20:00',
        images: {
          symbol: 'https://images.pokemontcg.io/swsh4/symbol.png',
          logo: 'https://images.pokemontcg.io/swsh4/logo.png',
        },
      },
      number: '7',
      artist: 'Uta',
      rarity: 'Rare',
      flavorText:
        'This six-legged Pokémon is easily capable of transporting an adult in flight. The wings on its tail help it stay balanced.',
      nationalPokedexNumbers: [469],
      legalities: {
        unlimited: 'Legal',
        expanded: 'Legal',
      },
      images: {
        small: 'https://images.pokemontcg.io/swsh4/7.png',
        large: 'https://images.pokemontcg.io/swsh4/7_hires.png',
      },
      tcgplayer: {
        url: 'https://prices.pokemontcg.io/tcgplayer/swsh4-7',
        updatedAt: '2023/11/14',
        prices: {
          reverseHolofoil: {
            low: 0.09,
            mid: 0.3,
            high: 2.77,
            market: 0.3,
            directLow: null,
          },
          normal: {
            low: 0.03,
            mid: 0.15,
            high: 2.77,
            market: 0.11,
            directLow: null,
          },
        },
      },
    },
  ] as CardData[],
  count: 2,
  page: 1,
  pageSize: 1,
  totalCount: 2,
};

export const customPageHandler = (page: SearchResponse<CardData>) =>
  http.get('https://api.pokemontcg.io/v2/cards', async () => {
    delay();
    return HttpResponse.json(page);
  });

export const cards = new Map(response.data.map((card) => [card.id, card]));

export const handlers = [
  http.get('https://api.pokemontcg.io/v2/cards', async () => {
    delay();
    return HttpResponse.json(response);
  }),
  http.get<CardIdRequestParams>(
    'https://api.pokemontcg.io/v2/cards/:id',
    ({ params }) => {
      delay();
      const item = { data: cards.get(params.id) ?? null };
      return HttpResponse.json(item);
    }
  ),
];
