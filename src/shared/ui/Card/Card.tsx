import { Component } from 'react';
import './style.css';
import { SwapiPeople } from '@shared/types/api';

export type CardProps = Partial<SwapiPeople>;

export class Card extends Component<CardProps> {
  render() {
    return (
      <div className="card">
        {Object.entries(this.props).map(([key, value]) => {
          return (
            <div className="card_line" key={key}>{`${key}: ${value}`}</div>
          );
        })}
      </div>
    );
  }
}
