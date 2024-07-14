import type { HTMLProps } from 'react';
import { DOTS, usePagination } from '../lib/hooks';
import style from './Paginator.module.scss';

export type PaginatorProps = HTMLProps<HTMLDivElement> & {
  pageCount: number;
  currentPage: number;
  siblingCount: number;
  onChangePage?: (nextPage: number) => void;
};

export function Paginator({
  pageCount,
  currentPage,
  siblingCount,
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
      className={style.paginator_button}
      onClick={prevPage}
    >
      &lt;
    </button>
  );
  const nextPageButton = (
    <button
      type="button"
      disabled={currentPage >= pageCount}
      className={style.paginator_button}
      onClick={nextPage}
    >
      &gt;
    </button>
  );

  let dotsIndex = 0;

  return (
    <div {...otherProps} className={style.paginator}>
      {prevPageButton}
      {...paginationRange.map((pageNumber) => {
        const isCurrent = pageNumber === currentPage;
        const isDots = pageNumber === DOTS;
        const disabled = isCurrent || isDots;
        const className = isCurrent
          ? style.paginator_button_current
          : style.paginator_button;
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
          >
            {pageNumber}
          </button>
        );
      })}
      {nextPageButton}
    </div>
  );
}
