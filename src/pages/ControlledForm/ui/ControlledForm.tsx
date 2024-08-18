import { UserForm, userSchema } from '@entities/user'
import { yupResolver } from '@hookform/resolvers/yup'
import { fileToBase64 } from '@shared/lib'
import { useAppDispatch, useAppSelector } from '@shared/store'
import { add, selectCountries, selectGenders } from '@shared/store/formSlice'
import { FieldSet } from '@shared/ui/FieldSet'
import { Form } from '@shared/ui/Form'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export default function ControlledForm() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const countries = useAppSelector(selectCountries)
  const genders = useAppSelector(selectGenders)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(userSchema),
    mode: 'all',
  })

  const onSubmit: SubmitHandler<UserForm> = async validData => {
    const form = { ...validData }
    if (form.upload && '0' in form.upload && form.upload[0] instanceof Blob) {
      form.uploadBase64 = await fileToBase64(form.upload['0'])
      form.upload = []
      form.isRecent = true
      dispatch(add(form))
      navigate('/')
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* Name */}
      <FieldSet validationKey="name" label="Name" errors={errors}>
        <input type="text" {...register('name')} />
      </FieldSet>
      {/* Age */}
      <FieldSet validationKey="age" label="Age" errors={errors}>
        <input type="number" {...register('age')} />
      </FieldSet>
      {/* E-Mail */}
      <FieldSet validationKey="email" label="E-Mail" errors={errors}>
        <input type="email" {...register('email')} />
      </FieldSet>
      {/* Password */}
      <FieldSet validationKey="password" label="Password" errors={errors}>
        <input type="password" {...register('password')} />
      </FieldSet>
      {/* Repeat Password */}
      <FieldSet
        validationKey="passwordDuplicate"
        label="Confirm password"
        errors={errors}
      >
        <input type="password" {...register('passwordDuplicate')} />
      </FieldSet>
      {/* Gender */}
      <FieldSet validationKey="gender" label="Gender" errors={errors}>
        <select {...register('gender')}>
          {genders.map(({ code, name }) => (
            <option key={code}>{name}</option>
          ))}
        </select>
      </FieldSet>
      {/* Autocomplete control to select country */}
      <FieldSet errors={errors} validationKey="country" label="Country">
        <input type="search" list="countries" {...register('country')} />
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
        <input type="checkbox" {...register('terms')} />
      </FieldSet>
      <FieldSet errors={errors} validationKey="upload" label="Upload image">
        <input type="file" {...register('upload')} />
      </FieldSet>
      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </Form>
  )
}
