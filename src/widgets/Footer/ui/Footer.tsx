import classNames from 'classnames';
import style from './Footer.module.scss';

export function Footer() {
  return (
    <footer className={style.footer} data-testid="footer">
      <nav className={style.navList}>
        <a
          href="https://rs.school/"
          target="_blank"
          rel="noreferrer"
          className={style.navItem}
        >
          Rolling Scopes School
        </a>
        <p className={style.navItem}>2024</p>
        <a
          href="https://github.com/SkarabeyDM"
          target="_blank"
          rel="noreferrer"
          className={classNames(style.navItem, style.avatar)}
        >
          @SkarabeyDM
        </a>
      </nav>
    </footer>
  );
}
