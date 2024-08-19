import { ControlledForm } from '@pages/ControlledForm'
import { Layout } from '@pages/Layout'
import { MainPage } from '@pages/MainPage'
import { UncontrolledForm } from '@pages/UncontrolledForm'
import { PATHS } from '@shared/const'
import { createBrowserRouter, RouteObject } from 'react-router-dom'

export const routeObject: RouteObject[] = [
  {
    path: PATHS.MAIN,
    element: <Layout />,
    children: [
      { path: PATHS.MAIN, element: <MainPage /> },
      { path: PATHS.FORM, element: <UncontrolledForm /> },
      { path: PATHS.HOOK_FORM, element: <ControlledForm /> },
    ],
  },
]

export const router = createBrowserRouter(routeObject)
