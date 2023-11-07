import { ComponentProps } from 'react';

export type SectionProps = ComponentProps<'section'>;

export function Section({ className, ...otherProps }: SectionProps) {
  return (
    <section className={`section ${className ?? ''}`} {...otherProps}></section>
  );
}
