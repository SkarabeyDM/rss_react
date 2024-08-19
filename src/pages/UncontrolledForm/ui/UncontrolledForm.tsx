import { UserForm, userSchema } from '@entities/user'
import { initialErrors } from '@shared/const'
import { fileToBase64 } from '@shared/lib'
import { useAppDispatch, useAppSelector } from '@shared/store'
import { add, selectCountries, selectGenders } from '@shared/store/formSlice'
import { FieldSet } from '@shared/ui/FieldSet'
import { Form } from '@shared/ui/Form'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ValidationError } from 'yup'

export default function UncontrolledForm() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const countries = useAppSelector(selectCountries)
  const genders = useAppSelector(selectGenders)
  const [errors, setErrors] = useState({ ...initialErrors })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrors(initialErrors)
    const formData = new FormData(e.currentTarget)
    const form = Object.fromEntries(formData.entries()) as unknown as UserForm

    try {
      await userSchema.validate(form, { abortEarly: false })
      navigate('/')
      if (form.upload instanceof Blob) {
        form.uploadBase64 = await fileToBase64(form.upload)
        form.upload = []
        form.isRecent = true
        dispatch(add(form))
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        error.inner.forEach(error => {
          const errorName = (error.path ?? '') as keyof typeof errors
          setErrors(state => {
            if (errorName in state)
              return {
                ...state,
                [errorName]: [...state[errorName], error.message],
              }
            else return state
          })
        })
      }
    }
  }
  return (
    <Form onSubmit={handleSubmit}>
      {/* Name */}
      <FieldSet validationKey="name" label="Name" errors={errors}>
        <input type="text" name="name" />
      </FieldSet>
      {/* Age */}
      <FieldSet validationKey="age" label="Age" errors={errors}>
        <input type="number" name="age" />
      </FieldSet>
      {/* E-Mail */}
      <FieldSet validationKey="email" label="E-Mail" errors={errors}>
        <input type="email" name="email" />
      </FieldSet>
      {/* Password */}
      <FieldSet validationKey="password" label="Password" errors={errors}>
        <input type="password" name="password" />
      </FieldSet>
      {/* Repeat Password */}
      <FieldSet
        validationKey="passwordDuplicate"
        label="Confirm password"
        errors={errors}
      >
        <input type="password" name="passwordDuplicate" />
      </FieldSet>
      {/* Gender */}
      <FieldSet validationKey="gender" label="Gender" errors={errors}>
        <select name="gender">
          {genders.map(({ code, name }) => (
            <option key={code}>{name}</option>
          ))}
        </select>
      </FieldSet>
      {/* Autocomplete control to select country */}
      <FieldSet errors={errors} validationKey="country" label="Country">
        <input name="country" type="search" list="countries" />
        <datalist id="countries">
          {countries.map(({ code, name }) => (
            <option key={code} value={name}></option>
          ))}
        </datalist>
      </FieldSet>
      {/* Accept Terms and Conditions */}
      <FieldSet
        errors={errors}
        validationKey="terms"
        label="Terms and Conditions agreement"
      >
        <input name="terms" type="checkbox" />
      </FieldSet>
      <FieldSet errors={errors} validationKey="upload" label="Upload image">
        <input name="upload" type="file" />
      </FieldSet>
      <button type="submit">Submit</button>
    </Form>
  )
}
