import { RootState } from './store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ListItem } from '@shared/types'
import { UserForm } from '@entities/user'
import { COUNTRIES, GENDERS } from '@shared/const'
import { testImage1 } from '@shared/const/testImages'

type Country = ListItem
type Genders = ListItem

export interface baseState {
  countries: Country[];
  genders: Genders[];
  users: UserForm[];
}

const testUsers: UserForm[] = [
  {
    name: 'Ivan Tver',
    age: 40,
    email: 'vanya@mail.ru',
    form: 'uncontrolled',
    isRecent: true,
    password: '1!aA',
    passwordDuplicate: '1!aA',
    country: 'Belarus',
    gender: 'male',
    upload: undefined,
    uploadBase64: testImage1,
    terms: true,
  },
]

const initialState: baseState = {
  countries: COUNTRIES,
  genders: GENDERS,
  users: testUsers,
}

export const formSlice = createSlice({
  name: 'base',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<UserForm>) => {
      const newState: UserForm[] = state.users.map(user => ({
        ...user,
        isRecent: false,
      }))
      newState.push(action.payload)
      state.users = newState
    },
  },
})

export const { add } = formSlice.actions
export const selectGenders = (state: RootState) => state.form.genders
export const selectUsers = (state: RootState) => state.form.users
export const selectCountries = (state: RootState) => state.form.countries
export default formSlice.reducer
