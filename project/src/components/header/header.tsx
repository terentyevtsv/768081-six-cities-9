import Authorization from '../authorization/authorization';
import HeaderLogo from '../header-logo/header-logo';

type HeaderProps = {
  onSignOut?: () => void,
  onMovingToMainPage?: () => void
}

function Header({onSignOut, onMovingToMainPage}: HeaderProps) {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <HeaderLogo onMovingToMainPage={onMovingToMainPage}/>
          <Authorization
            onSignOut={onSignOut}
            onMovingToMainPage={onMovingToMainPage}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
