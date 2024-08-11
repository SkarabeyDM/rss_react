import { renderWithProviders, server } from '@tests/mocks';
import { r2d2 } from '@tests/mocks/people';
import { fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { CardDetailed } from './CardDetailed';

const id = 1;

describe('CardDetailed', () => {
  mockRouter.push(`/?card=${id}`);
  const renderCardDetailed = () => {
    const rendered = renderWithProviders(<CardDetailed />);

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

    expect(mockRouter.query.card).toBe(`${id}`);
    fireEvent.click(closeButton);
    expect(mockRouter.query.card).toBe(undefined);
  });
});
