import { User } from '@entities/user'

export type ErrorMap = Record<keyof User, string[]>

export interface ListItem {
  code: string;
  name: string;
}
