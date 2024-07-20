import type React from 'react';
import { useSearchParams } from 'react-router-dom';
import { getImageByUrl } from '@shared/utils/utils';
import { People } from '@shared/api/swapi';
import usePromise from 'react-use-promise';
import style from './CardDetailed.module.scss';

export type CardDetailedProps = React.ComponentProps<'article'>;

export function CardDetailed({ ...otherProps }: CardDetailedProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const cardId = +(searchParams.get('card') ?? 1);
  const [data, , promiseState] = usePromise(() => People.get(cardId), [cardId]);
  return (
    <article className={`${style.cardDetailed}`} {...otherProps}>
      <button
        type="button"
        className={style.cardDetailedCloseButton}
        onClick={() =>
          setSearchParams(() => {
            searchParams.delete('card');
            return searchParams;
          })
        }
      >
        ✖
      </button>
      {promiseState !== 'resolved'
        ? 'Loading...'
        : data && (
            <div className={style.cardDetailedWrapper}>
              <img
                src={getImageByUrl(data.url) ?? ''}
                alt="Character"
                className={style.cardDetailedImage}
              />
              <h2>{data.name}</h2>
              <table className={style.cardDetailedTable}>
                <tbody>
                  <tr>
                    <th>Gender</th>
                    <td>{data.gender}</td>
                  </tr>
                  <tr>
                    <th>Birth year</th>
                    <td>{data.birth_year}</td>
                  </tr>
                  <tr>
                    <th>Height</th>
                    <td>{data.height}</td>
                  </tr>
                  <tr>
                    <th>Mass</th>
                    <td>{data.mass}</td>
                  </tr>
                  <tr>
                    <th>Eye color</th>
                    <td>{data.eye_color}</td>
                  </tr>
                  <tr>
                    <th>Hair color</th>
                    <td>{data.hair_color}</td>
                  </tr>
                  <tr>
                    <th>Skin color</th>
                    <td>{data.skin_color}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
    </article>
  );
}
