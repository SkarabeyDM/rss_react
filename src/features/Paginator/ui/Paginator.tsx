import React, { ComponentProps } from 'react';
import { CardData, SearchResponse } from '../../../shared/model';
import PaginatorButton from './Paginator.Button';
import { useSearchParams } from 'react-router-dom';
import styles from './Paginator.module.scss';

export type PaginatorProps = ComponentProps<'div'> &
  Pick<SearchResponse<CardData>, 'totalCount' | 'page' | 'pageSize'>;

export function Paginator({
  totalCount,
  page,
  pageSize,
  className,
  ...otherProps
}: PaginatorProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const totalPages = Math.ceil(totalCount / pageSize);
  if (totalPages === 1) return null;

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    searchParams.set('page', event.currentTarget.value);
    setSearchParams(searchParams);
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
