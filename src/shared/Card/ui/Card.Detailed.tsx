import React, { useEffect, useState } from 'react';
import { useCardId } from '../../model/hooks';
import styles from './Card.module.scss';
import { PropertyLine } from '../../PropertyLine';
import { CardData, PokemonAPI } from '../../model';
import { SUPERTYPES } from './Card';

export function CardDetailed() {
  const [isActive, setIsActive] = useState(false);
  const [data, setData] = useState<CardData>(null!);

  const { cardId, setCardId } = useCardId();

  useEffect(() => {
    if (cardId === null) {
      setIsActive(false);
      return;
    }

    const loadData = async () => {
      const response = await PokemonAPI.getCardById(cardId);

      setData(response.data);
      setIsActive(true);
    };

    loadData();
  }, [cardId]);

  const closeButtonClick = () => {
    setCardId(null);
  };

  if (!isActive) return null;
  if (data === null) return null;
  const {
    images,
    name,
    supertype,
    types,
    hp,
    artist,
    level,
    rarity,
    set,
    subtypes,
    attacks,
  } = data;

  return (
    <div className={styles.card_detailed__wrapper}>
      <div className={`${styles.card_detailed} ${SUPERTYPES[supertype]}`}>
        <button
          className={styles.card_detailed__close_button}
          onClick={closeButtonClick}
        />
        <img
          className={styles.card_detailed__image}
          src={images.large}
          alt={`${name}${artist ? ` by ${artist}` : ''}`}
        />
        <PropertyLine name="Artist" value={artist} />
        <h3 className={styles.card_detailed__title}>{name}</h3>
        <div className={styles.card_detailed__details}>
          <PropertyLine name="Supertype" value={supertype} />
          <PropertyLine name="Level" value={level} />
          <PropertyLine name="HP" value={hp} />
          <PropertyLine name="Types" value={types} />
          <PropertyLine name="Subtypes" value={subtypes} />
          <PropertyLine name="Rarity" value={rarity} />
          <PropertyLine name="Set" value={set.name} />
          <PropertyLine
            name="Attacks"
            value={attacks?.map((attack) => attack.name)}
          />
        </div>
      </div>
    </div>
  );
}
