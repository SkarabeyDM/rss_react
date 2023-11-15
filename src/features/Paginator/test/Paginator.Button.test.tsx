import { describe, expect, test } from 'vitest';
import { PaginatorButton, PaginatorButtonProps } from '../ui/Paginator.Button';
import { render, screen } from '@testing-library/react';

describe('PaginatorButton', () => {
  describe('Basic props', () => {
    const firstPage = 1;
    const props: PaginatorButtonProps = {
      variant: 'first',
      threshold: 1,
      nextPage: 1,
      currentPage: 10,
    };

    test('Is enabled', () => {
      render(<PaginatorButton {...props} />);
      expect(screen.getByRole('button')).toBeEnabled();
    });

    test('Is disabled', () => {
      render(<PaginatorButton {...props} currentPage={firstPage} />);
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });
});
