import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type FooterProps = {
  onMovingToMainPage?: () => void
}

function Footer({onMovingToMainPage}: FooterProps) {
  return (
    <footer className="footer container">
      <Link
        className="footer__logo-link"
        to={AppRoute.Main}
        onClick={onMovingToMainPage}
      >
        <img
          className="footer__logo"
          src="img/logo.svg"
          alt="6 cities logo"
          width="64"
          height="33"
        />
      </Link>
    </footer>
  );
}

export default Footer;
