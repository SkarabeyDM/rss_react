import styles from './Card.module.scss';
import { CardData, Supertype } from '../../model';
import { PropertyLine } from '../../PropertyLine';
import { useEffect, useState } from 'react';
import { useCardId } from '../../model/hooks';

export type CardProps = CardData;

export const SUPERTYPES = {
  [Supertype.Energy]: styles.supertype__energy,
  [Supertype.Trainer]: styles.supertype__trainer,
  [Supertype.Pokemon]: styles.supertype__pokemon,
};

export function Card(props: CardProps) {
  const { images, name, supertype, types, hp, artist, level, id } = props;
  const [isActive, setIsActive] = useState(false);

  const { cardId, setCardId } = useCardId();

  useEffect(() => {
    setIsActive(cardId === id);
  }, [cardId]);

  const handleClick = () => {
    setCardId(id);
  };


  return (
    <button
      className={`${styles.card} ${SUPERTYPES[supertype]} ${
        isActive ? styles.active : ''
      } `}
      onClick={handleClick}
    >
      <img
        className={styles.card__image}
        src={images.small}
        alt={`${name}${artist ? ` by ${artist}` : ''}`}
      />
      <h3 className={styles.card__title}>{name}</h3>
      <div className={styles.card__details}>
        <PropertyLine name="Supertype" value={supertype} />
        <PropertyLine name="Level" value={level} />
        <PropertyLine name="HP" value={hp} />
        <PropertyLine name="Types" value={types?.join(', ')} />
      </div>
    </button>
  );
}
