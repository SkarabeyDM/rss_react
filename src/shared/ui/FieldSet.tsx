import { ErrorMap } from '@shared/types'
import { PropsWithChildren } from 'react'

interface FieldSetProps extends PropsWithChildren {
  label: string;
  validationKey: keyof ErrorMap;
  errors: ErrorMap;
}

export function FieldSet({
  children,
  errors,
  label,
  validationKey,
}: FieldSetProps) {
  const errorMessage = errors[validationKey][0] ?? ''
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
