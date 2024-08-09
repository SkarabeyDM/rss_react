import type React from 'react';
import { useSearchParams } from 'react-router-dom';
import { getImageByUrl } from '@shared/utils';
import { SWAPI } from '@shared/api';
import style from './CardDetailed.module.scss';

export type CardDetailedProps = React.ComponentProps<'article'>;

const renderTableRows = (...rowsData: { title: string; value: string }[]) => {
  return rowsData.map(({ title, value }) => (
    <tr
      key={title}
      className={style.cardDetailedTableRow}
      data-testid={title.toLowerCase()}
    >
      <th>{title}</th>
      <td>{value}</td>
    </tr>
  ));
};

export function CardDetailed({ ...otherProps }: CardDetailedProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const cardId = +(searchParams.get('card') ?? 1);
  const { data, isLoading } = SWAPI.useGetPeopleByIdQuery(cardId);

  return (
    <article
      className={`${style.cardDetailed}`}
      data-testid="card-detailed"
      {...otherProps}
    >
      <button
        type="button"
        className={style.cardDetailedCloseButton}
        onClick={() =>
          setSearchParams(() => {
            searchParams.delete('card');
            return searchParams;
          })
        }
        data-testid="close-button"
      >
        ✖
      </button>
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        data && (
          <div className={style.cardDetailedWrapper}>
            <img
              src={getImageByUrl(data.url) ?? ''}
              alt="Character"
              className={style.cardDetailedImage}
            />
            <h2 className={style.cardDetailedTitle} data-testid="name">
              {data.name}
            </h2>
            <table className={style.cardDetailedTable}>
              <tbody>
                {renderTableRows(
                  { title: 'Gender', value: data.gender },
                  { title: 'Birth year', value: data.birth_year },
                  { title: 'Height', value: data.height },
                  { title: 'Mass', value: data.mass },
                  { title: 'Eye color', value: data.eye_color },
                  { title: 'Hair color', value: data.hair_color },
                  { title: 'Body color', value: data.skin_color }
                )}
              </tbody>
            </table>
          </div>
        )
      )}
    </article>
  );
}
