import React, { ComponentProps } from 'react';
import styles from './Paginator.module.scss';

export type PaginatorButtonProps = ComponentProps<'button'> & {
  variant: 'prev' | 'next' | 'first' | 'last';
  nextPage: number;
  threshold: number;
  currentPage: number;
};

export default function PaginatorButton({
  variant,
  nextPage,
  threshold,
  currentPage,
  ...otherProps
}: PaginatorButtonProps) {
  return (
    <button
      className={`${styles.paginator__icon} ${styles[variant]}`}
      value={nextPage}
      disabled={currentPage === threshold}
      {...otherProps}
    />
  );
}
