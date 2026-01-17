// app/components/Footer/Footer.tsx

import css from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Ihor Duma</p>
          <p>
            Contact us:{' '}
            <a href="mailto:diezp93@gmail.com">diezp93@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;