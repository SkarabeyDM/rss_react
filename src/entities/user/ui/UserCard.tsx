import classNames from 'classnames'
import { UserForm } from '../model'
import style from './UserCard.module.scss'

const renderTableRows = (...rowsData: { title: string; value: string }[]) => {
  return rowsData.map(({ title, value }) => (
    <tr key={title} data-testid={title.toLowerCase()}>
      <th>{title}</th>
      <td>{value}</td>
    </tr>
  ))
}

export function UserCard({
  name,
  age,
  gender,
  email,
  uploadBase64,
  isRecent,
}: UserForm) {
  return (
    <article className={classNames(style.card, isRecent && style.recent)}>
      <img src={uploadBase64} alt="ava" />
      <h2>{name}</h2>
      <table>
        <tbody>
          {renderTableRows(
            { title: 'Gender', value: gender },
            { title: 'Age', value: age?.toString() ?? '' },
            { title: 'E-Mail', value: email },
          )}
        </tbody>
      </table>
    </article>
  )
}
