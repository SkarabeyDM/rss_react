import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { cards } from '../../../mocks/handlers';
import userEvent from '@testing-library/user-event';
import { CardDetailed } from '../ui/Card.Detailed';
import { helpers } from '../../PropertyLine';

const cardsArr = [...cards.values()];
const parse = helpers.parsePropertyLineInput;
const customRender = (cardId: string) =>
  render(
    <MemoryRouter initialEntries={[`?cardId=${cardId}`]}>
      <CardDetailed />
    </MemoryRouter>
  );

describe('CardDetailed', () => {
  test('Rendering props', async () => {
    const cardData = cardsArr[0];
    customRender(cardData.id);
    const {
      images,
      name,
      supertype,
      types,
      hp,
      artist,
      level,
      rarity,
      set,
      subtypes,
      attacks,
    } = cardData;

    expect(
      await screen.findByAltText(`${name}${artist ? ` by ${artist}` : ''}`)
    ).toHaveAttribute('src', images.large);
    expect(await screen.findByText(parse(name))).toBeInTheDocument();
    expect(await screen.findByText(parse(supertype))).toBeInTheDocument();
    expect(await screen.findByText(parse(hp))).toBeInTheDocument();
    expect(await screen.findByText(parse(level))).toBeInTheDocument();
    expect(await screen.findByText(parse(types))).toBeInTheDocument();
    expect(await screen.findByText(parse(rarity))).toBeInTheDocument();
    expect(await screen.findByText(parse(subtypes))).toBeInTheDocument();
    expect(await screen.findByText(parse(set.name))).toBeInTheDocument();
    expect(
      await screen.findByText(parse(attacks?.map((attack) => attack.name)))
    ).toBeInTheDocument();
  });
  test('Functionality', async () => {
    const cardData = cardsArr[0];
    customRender(cardData.id);

    await userEvent.click(await screen.findByRole('button'));
  });
});
