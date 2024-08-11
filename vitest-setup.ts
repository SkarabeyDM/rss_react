import '@testing-library/jest-dom/vitest';
import * as mockRouter from 'next-router-mock';

beforeAll(() => {
  vi.mock('next/navigation', () => ({
    ...mockRouter,
    useSearchParams: vi.fn(() => ({
      get: vi.fn(),
    })),
    usePathname: vi.fn(),
  }));
});
