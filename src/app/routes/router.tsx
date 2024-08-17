import { FormPage } from '@pages/FormPage'
import { HookFormPage } from '@pages/HookFormPage'
import { Layout } from '@pages/Layout'
import { MainPage } from '@pages/MainPage'
import { PATHS } from '@shared/const'
import { createBrowserRouter, RouteObject } from 'react-router-dom'

export const routeObject: RouteObject[] = [
  {
    path: PATHS.MAIN,
    element: <Layout />,
    children: [
      { path: PATHS.MAIN, element: <MainPage /> },
      { path: PATHS.FORM, element: <FormPage /> },
      { path: PATHS.HOOK_FORM, element: <HookFormPage /> },
    ],
  },
]

export const router = createBrowserRouter(routeObject)
