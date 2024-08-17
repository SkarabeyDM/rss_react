import { RouterProvider } from 'react-router-dom'
import { router } from '@app/routes'
import style from './App.module.css'

export function App() {
  return (
    <div className={style.app}>
      <RouterProvider router={router} />
    </div>
  )
}
