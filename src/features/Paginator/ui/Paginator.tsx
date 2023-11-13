import React, { ComponentProps, useContext } from 'react';
import { PaginatorButton } from './Paginator.Button';
import { useSearchParams } from 'react-router-dom';
import styles from './Paginator.module.scss';
import { SearchContext } from '../../../shared/сontext';

export type PaginatorProps = ComponentProps<'div'>;
export function Paginator({ className, ...otherProps }: PaginatorProps) {
  const { response } = useContext(SearchContext);
  const [, setSearchParams] = useSearchParams();

  if (response === null) return null;
  const { totalCount, page, pageSize } = response;
  const totalPages = Math.ceil(totalCount / pageSize);
  if (totalPages === 1) return null;

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setSearchParams((searchParams) => {
      searchParams.set('page', event.currentTarget.value);
      return searchParams;
    });
  };

  return (
    <div className={`${styles.paginator} ${className ?? ''}`} {...otherProps}>
      <PaginatorButton
        currentPage={page}
        nextPage={1}
        threshold={1}
        onClick={handleClick}
        variant={'first'}
      />
      <PaginatorButton
        currentPage={page}
        nextPage={page - 1}
        threshold={1}
        onClick={handleClick}
        variant={'prev'}
      />
      <div className={styles.paginator__icon}>{page}</div>
      <PaginatorButton
        currentPage={page}
        nextPage={page + 1}
        threshold={totalPages}
        onClick={handleClick}
        variant={'next'}
      />
      <PaginatorButton
        currentPage={page}
        nextPage={totalPages}
        threshold={totalPages}
        onClick={handleClick}
        variant={'last'}
      />
    </div>
  );
}
