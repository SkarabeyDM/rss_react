import { initialErrors } from '@shared/const'
import { ErrorMap } from '@shared/types'
import { PropsWithChildren } from 'react'
import { FieldErrors } from 'react-hook-form'

interface FieldSetProps extends PropsWithChildren {
  label: string;
  validationKey: keyof ErrorMap;
  errors: ErrorMap | FieldErrors;
}

const errorsKeys = Object.keys(initialErrors)

export const isCustomErrors = (data: unknown | ErrorMap): data is ErrorMap => {
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
    <fieldset title={errorMessage}>
      <span>{errorMessage}</span>
      <div>
        <label htmlFor={validationKey}>{label}</label>
        {children}
      </div>
    </fieldset>
  )
}
