import styles from './Card.module.scss';
import { CardData } from '../../../app/api';
import { PropertyLine } from '../../PropertyLine';
import { useSearchParams } from 'react-router-dom';

export type CardProps = CardData;

export function Card(props: CardProps) {
  const { images, name, supertype, types, hp, artist, level, id } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const handleClick = () => {
    searchParams.set('cardId', id);
    setSearchParams(searchParams);
  };

  return (
    <button
      onClick={handleClick}
    >
      <img
        className={styles.card__image}
        src={images.small}
        alt={`${name}${artist ? ` by ${artist}` : ''}`}
      />
      <h3 className={styles.card__title}>{name}</h3>
      <div className={styles.card__details}>
        <PropertyLine type="Supertype" value={supertype} />
        <PropertyLine type="Level" value={level} />
        <PropertyLine type="HP" value={hp} />
        <PropertyLine type="Types" value={types?.join(', ')} />
      </div>
    </button>
  );
}

