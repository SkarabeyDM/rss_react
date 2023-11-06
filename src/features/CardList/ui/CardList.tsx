import React, { Component } from 'react';
import { Card } from '../../../shared/Card';
import { CardData } from '../../../app/api';
import styles from './CardList.module.scss';

export type CardListProps = {
  cards: CardData[];
};

export class CardList extends Component<CardListProps> {
  constructor(props: CardListProps) {
    super(props);
  }
  render() {
    return (
      <div className={styles.card_list}>
        {this.props.cards.map((card) => (
          <Card key={card.id} {...card}></Card>
        ))}
      </div>
    );
  }
}
