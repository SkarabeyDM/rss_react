import { renderWithProviders, server } from '@tests/mocks';
import { r2d2 } from '@tests/mocks/people';
import { fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import { useState } from 'react';
import { CardDetailed } from './CardDetailed';

const id = 1;
let mockSearchParam = `card=${id}`;

describe('CardDetailed', () => {
  vi.mock('react-router-dom', async () => ({
    ...(await vi.importActual('react-router-dom')),
    useSearchParams: () => {
      const [params, setParams] = useState(
        new URLSearchParams(mockSearchParam)
      );
      return [
        params,
        (newParams: string) => {
          mockSearchParam = newParams;
          setParams(new URLSearchParams(newParams));
        },
      ];
    },
  }));

  const renderCardDetailed = () => {
    const rendered = renderWithProviders(<CardDetailed />, {
      path: '/people/:id',
      router: { initialEntries: [`/people/${id}/`] },
    });

    const closeButton = rendered.getByTestId('close-button');

    return { ...rendered, closeButton };
  };
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  it('before and after loading content', async () => {
    const { getByText, queryByText, getByTestId } = renderCardDetailed();

    expect(getByText('Loading...')).toBeInTheDocument();

    await waitForElementToBeRemoved(queryByText('Loading...'));

    expect(getByTestId('name')).toHaveTextContent(r2d2.name);
    expect(getByTestId('gender')).toHaveTextContent(r2d2.gender);
    expect(getByTestId('birth year')).toHaveTextContent(r2d2.birth_year);
    expect(getByTestId('height')).toHaveTextContent(r2d2.height);
    expect(getByTestId('mass')).toHaveTextContent(r2d2.mass);
    expect(getByTestId('eye color')).toHaveTextContent(r2d2.eye_color);
    expect(getByTestId('hair color')).toHaveTextContent(r2d2.hair_color);
    expect(getByTestId('body color')).toHaveTextContent(r2d2.skin_color);
  });

  it('close', async () => {
    const { closeButton } = renderCardDetailed();

    expect(mockSearchParam).toContain('card');
    fireEvent.click(closeButton);
    expect(mockSearchParam).not.toContain('card');
  });
});
