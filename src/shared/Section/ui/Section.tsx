import { PropsWithChildren } from 'react';

type SectionProps = PropsWithChildren;

export function Section({ children }: SectionProps) {
  return <section className="section">{children}</section>;
}
