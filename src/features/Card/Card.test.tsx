import { fireEvent, screen } from '@testing-library/react';
import { r2d2 } from '@src/tests/mocks/people';
import { renderWithProviders } from '@src/tests/mocks/utils';
import { getImageByUrl } from '@shared/utils';
import type { IPeople } from '@shared/types';
import { Card } from './Card';

describe('Card', () => {
  it('renders correctly', () => {
    const { getByTestId } = renderWithProviders(<Card data={r2d2} />);
    const card = getByTestId('card');
    const name = getByTestId('card-name');
    const button = getByTestId('card-selection-button');
    const img = getByTestId('card-img') as HTMLImageElement;
    expect(card).toBeInTheDocument();
    expect(img.src).toBe(getImageByUrl(r2d2.url));
    expect(img.alt).toBe(r2d2.name);
    expect(name).toHaveTextContent(r2d2.name);
    expect(button).toHaveTextContent('Add');
  });

  it('Click on button adds and removes Card from "cardList"', async () => {
    const { getByTestId } = renderWithProviders(<Card data={r2d2} />);
    const button = getByTestId('card-selection-button');
    expect(button).toHaveTextContent('Add');
    fireEvent.click(button);
    console.log(button.innerHTML);
    expect(await screen.findByText('Remove')).toBeInTheDocument();
    fireEvent.click(button);
    expect(await screen.findByText('Add')).toBeInTheDocument();
  });

  it('render with wrong image link', () => {
    const propsWithBrokenImageLink: IPeople = { ...r2d2, url: '' };
    const { getByTestId } = renderWithProviders(
      <Card data={propsWithBrokenImageLink} />
    );
    const image = getByTestId('card-img') as HTMLImageElement;
    expect(image.src).toContain('');
  });
});
