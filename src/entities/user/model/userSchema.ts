import * as yup from 'yup'
import YupPassword from 'yup-password'
import countriesJSON from '@shared/const/countries.json'

YupPassword(yup)

const { number, object, string } = yup

const IMAGE_SIZE_LIMIT = 100

type InputFile = Blob | Blob[] | undefined

const isAgree = (agree: boolean | string | undefined) => !!agree

const isCountryExists = (country: string) => {
  return countriesJSON.find(({ name }) => name === country) !== undefined
}

const isImage = (files: InputFile) => {
  if (!files) return false
  const file = files instanceof Blob ? files : files[0]
  return !!file.type.match(/image\/(jpeg|jpj|png)/)
}

const isFileSizeInRange = (files: InputFile) => {
  if (!files) return false
  const file = files instanceof Blob ? files : files[0]
  return file.size <= IMAGE_SIZE_LIMIT
}

export const userSchema = object({
  name: string()
    .matches(
      /^[A-Z][a-z]*(?: [A-Z][a-z]*)*$/,
      'Name must start with a capital letter',
    )
    .required('Name is required'),
  age: number()
    .required('Age is required')
    .positive('Age cannot be negative')
    .integer(`Input full years`),
  email: string().required('Email is required').email(`That's not an e-mail`),
  password: string()
    .required('Password is required')
    .minNumbers(1, 'Password must contain at least 1 number')
    .minUppercase(1, 'Password must contain at least 1 upper letter')
    .minLowercase(1, 'Password must contain at least 1 lowercase letter')
    .minSymbols(1, 'Password must contain at least 1 special character'),
  passwordDuplicate: string().oneOf(
    [yup.ref('password')],
    'Password must match',
  ),
  gender: yup.string().required('Gender is required'),
  country: yup
    .string()
    .required('Country is required')
    .test(
      'country-is-exists',
      'The country must match with the list',
      isCountryExists,
    ),
  terms: yup
    .mixed<boolean | string>()
    .required('Agreement is required')
    .test('is-agree', 'Agreement is required', isAgree),
  upload: yup
    .mixed<Blob | Blob[]>()
    .required('Picture is required')
    .test('is-image', 'File type whether .png or .jpg', isImage)
    .test(
      'file-size',
      `File size limit ${IMAGE_SIZE_LIMIT}kb`,
      isFileSizeInRange,
    ),
})

export type User = yup.InferType<typeof userSchema>
