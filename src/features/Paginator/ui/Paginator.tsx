import React, { ComponentProps } from 'react';
import { PaginatorButton } from './Paginator.Button';
import styles from './Paginator.module.scss';
import { CardData, SearchResponse } from '../../../shared/model';

export type PaginatorProps = ComponentProps<'div'> &
  Pick<SearchResponse<CardData>, 'totalCount' | 'page' | 'pageSize'> & {
    onSubmitPage?(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  };
export function Paginator({
  onSubmitPage,
  totalCount,
  page,
  pageSize,
  className,
  ...otherProps
}: PaginatorProps) {
  const totalPages = Math.ceil(totalCount / pageSize);
  if (totalPages === 1) return null;

  return (
    <div className={`${styles.paginator} ${className ?? ''}`} {...otherProps}>
      <PaginatorButton
        data-testid={'button-first'}
        currentPage={page}
        nextPage={1}
        threshold={1}
        onClick={onSubmitPage}
        variant={'first'}
      />
      <PaginatorButton
        data-testid={'button-prev'}
        currentPage={page}
        nextPage={page - 1}
        threshold={1}
        onClick={onSubmitPage}
        variant={'prev'}
      />
      <div className={styles.paginator__icon} data-testid={'pageNumber'}>
        {page}
      </div>
      <PaginatorButton
        data-testid={'button-next'}
        currentPage={page}
        nextPage={page + 1}
        threshold={totalPages}
        onClick={onSubmitPage}
        variant={'next'}
      />
      <PaginatorButton
        data-testid={'button-last'}
        currentPage={page}
        nextPage={totalPages}
        threshold={totalPages}
        onClick={onSubmitPage}
        variant={'last'}
      />
    </div>
  );
}
