import { Component } from 'react';
import { SwapiPeople } from '@shared/types/api';
import style from './Card.module.scss';

export type CardProps = Partial<SwapiPeople>;

export class Card extends Component<CardProps> {
  render() {
    return (
      <div className={style.card}>
        {Object.entries(this.props).map(([key, value]) => {
          return (
            <div
              className={style.card_line}
              key={key}
            >{`${key}: ${value}`}</div>
          );
        })}
      </div>
    );
  }
}
