import type { HTMLProps } from 'react';
import classNames from 'classnames';
import { globalClasses } from '@shared/style';
import { DOTS, usePagination } from '../lib/hooks';
import style from './Paginator.module.scss';

export interface PaginatorProps extends HTMLProps<HTMLDivElement> {
  pageCount: number;
  currentPage: number;
  siblingCount?: number;
  onChangePage?: (nextPage: number) => void;
}

export function Paginator({
  pageCount,
  currentPage,
  siblingCount = 0,
  onChangePage = () => {},
  ...otherProps
}: PaginatorProps) {
  const paginationRange = usePagination({
    currentPage,
    pageCount,
    siblingCount,
  });

  const prevPage = () => onChangePage(currentPage - 1);
  const nextPage = () => onChangePage(currentPage + 1);

  const prevPageButton = (
    <button
      type="button"
      disabled={currentPage <= 1}
      className={style.paginatorButton}
      onClick={prevPage}
      aria-label="previous page"
    >
      &lt;
    </button>
  );
  const nextPageButton = (
    <button
      type="button"
      disabled={currentPage >= pageCount}
      className={style.paginatorButton}
      onClick={nextPage}
      aria-label="next page"
    >
      &gt;
    </button>
  );

  let dotsIndex = 0;

  return (
    <nav
      {...otherProps}
      role="navigation"
      className={style.paginator}
      data-testid="paginator"
    >
      {prevPageButton}
      {...paginationRange.map((pageNumber) => {
        const isCurrent = pageNumber === currentPage;
        const isDots = pageNumber === DOTS;
        const disabled = isCurrent || isDots;
        const className = classNames(
          style.paginatorButton,
          isCurrent && globalClasses.primary
        );
        const onClick = disabled
          ? undefined
          : () => onChangePage(pageNumber as number);
        let key: string | number;
        if (isDots) {
          key = `d${dotsIndex}`;
          dotsIndex += 1;
        } else key = pageNumber;

        return (
          <button
            type="button"
            key={key}
            disabled={disabled}
            className={className}
            onClick={onClick}
            aria-label={
              typeof pageNumber === 'string' ? undefined : `page ${pageNumber}`
            }
            aria-current={isCurrent}
          >
            {pageNumber}
          </button>
        );
      })}
      {nextPageButton}
    </nav>
  );
}
