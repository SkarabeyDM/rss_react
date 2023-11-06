import React, { Component } from 'react';
import styles from './card.module.scss';
import { CardData } from '../../../app/api';

export type CardProps = CardData;

export class Card extends Component<CardProps> {
  constructor(props: CardProps) {
    super(props);
  }
  render() {
    const { images, name, supertype, types, hp, artist, level } = this.props;

    const detailStroke = (type: string, value: string | undefined) => (
      <div className={styles.card__detail}>
        <span className={styles.card__detail_type}>{type}:</span>
        <span>{value ?? '--'}</span>
      </div>
    );

    return (
      <div className={styles.card}>
        <img
        className={styles.card__image}
          src={images.small}
          alt={`${name}${artist ? ` by ${artist}` : ''}`}
        />
        <h3 className={styles.card__title}>{name}</h3>
        <div className={styles.card__details}>
          {detailStroke('Supertype', supertype)}
          {detailStroke('Level', level)}
          {detailStroke('HP', hp)}
          {detailStroke('Types', types?.join(', '))}
        </div>
      </div>
    );
  }
}
