import { PATHS } from '@shared/const'
import { NavLink, Outlet } from 'react-router-dom'
import style from './Layout.module.scss'
import globalStyle from '@style/global.module.scss'
import classNames from 'classnames'

const renderNavList = (...linkProps: { path: PATHS; text: string }[]) =>
  linkProps.map(({ path, text }) => (
    <li key={path}>
      <NavLink to={path} className={style.link}>
        {text}
      </NavLink>
    </li>
  ))

export function Layout() {
  return (
    <>
      <header>
        <nav className={classNames(style.nav, globalStyle.shadow)}>
          {renderNavList(
            { path: PATHS.MAIN, text: 'Home' },
            { path: PATHS.FORM, text: 'Form' },
            { path: PATHS.HOOK_FORM, text: 'Hook Form' },
          )}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}
