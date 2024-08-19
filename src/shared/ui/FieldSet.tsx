import { initialErrors } from '@shared/const'
import { ErrorMap } from '@shared/types'
import classNames from 'classnames'
import { PropsWithChildren } from 'react'
import { FieldErrors } from 'react-hook-form'
import style from './FieldSet.module.scss'

interface FieldSetProps extends PropsWithChildren {
  label: string;
  validationKey: keyof ErrorMap;
  errors: ErrorMap | FieldErrors;
}

const errorsKeys = Object.keys(initialErrors)

const isCustomErrors = (data: unknown | ErrorMap): data is ErrorMap => {
  if (typeof data !== 'object') return false
  return errorsKeys.every(
    key =>
      key in (data as ErrorMap)
      && Array.isArray((data as ErrorMap)[key as keyof ErrorMap]),
  )
}

export function FieldSet({
  children,
  errors,
  label,
  validationKey,
}: FieldSetProps) {
  const errorMessage = isCustomErrors(errors)
    ? errors[validationKey][0]
    : `${errors[validationKey]?.message || ''}`
  return (
    <fieldset
      title={errorMessage}
      className={classNames(style.fieldset, errorMessage && style.error)}
    >
      <span className={style.errorMsg}>{errorMessage}</span>
      <div className={style.labelContainer}>
        <label htmlFor={validationKey}>{label}</label>
        {children}
      </div>
    </fieldset>
  )
}
