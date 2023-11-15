import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Card } from '../ui/Card';
import { MemoryRouter } from 'react-router-dom';
import { cards } from '../../../mocks/handlers';
import userEvent from '@testing-library/user-event';
import { CardData } from '../../model';

const cardsArr = [...cards.values()];
const customRender = (cardProps: CardData) =>
  render(
    <MemoryRouter>
      <Card cardData={cardProps} />
    </MemoryRouter>
  );

describe('Card', () => {
  test('Rendering props', () => {
    const cardData = cardsArr[0];
    customRender(cardData);
    const { name, supertype, types, hp, artist, level } = cardData;

    expect(
      screen.getByAltText(`${name}${artist ? ` by ${artist}` : ''}`)
    ).toBeInTheDocument();
    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(supertype)).toBeInTheDocument();
    expect(screen.getByText(hp ?? '--')).toBeInTheDocument();
    expect(screen.getByText(level ?? '--')).toBeInTheDocument();
    expect(screen.getByText(types?.join(', ') ?? '--')).toBeInTheDocument();
  });
  test('Functionality', async () => {
    const cardData = cardsArr[0];
    customRender(cardData);

    await userEvent.click(screen.getByRole('button'));
  });
});
