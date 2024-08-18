import { UserCard } from '@entities/user/ui/UserCard'
import { useAppSelector } from '@shared/store'
import { selectUsers } from '@shared/store/formSlice'

export function MainPage() {
  const users = useAppSelector(selectUsers)
  return (
    <div>
      <h2>Choose a form</h2>
      <section>
        {users.map(userForm => (
          <UserCard {...userForm} />
        ))}
      </section>
    </div>
  )
}
