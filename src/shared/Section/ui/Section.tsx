import React, { Component, PropsWithChildren } from 'react';

type SectionProps = PropsWithChildren;

export class Section extends Component<SectionProps> {
  render() {
    return <section className="section">{this.props.children}</section>;
  }
}
