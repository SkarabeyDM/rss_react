import { FormProps, Form as RouterForm } from 'react-router-dom'
import style from './Form.module.scss'

export function Form(props: FormProps) {
  return <RouterForm {...props} className={style.form} />
}
