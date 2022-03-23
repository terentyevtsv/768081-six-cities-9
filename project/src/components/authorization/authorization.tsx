import { Link } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { AppRoute } from '../../const';
import { getAuthInfo } from '../../services/token';
import { MouseEvent } from 'react';
import { removeAuthAction } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

type AuthorizationProps = {
  onSignOut?: () => void,
  onMovingToMainPage?: () => void
}

function Authorization({onSignOut, onMovingToMainPage}: AuthorizationProps) {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch =  useAppDispatch();

  const authInfo = getAuthInfo();

  const handleSignOut = (evt: MouseEvent) => {
    evt.preventDefault();

    dispatch(removeAuthAction());
    if (onSignOut !== undefined) {
      onSignOut();
    }
  };

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {
          authorizationStatus === AuthorizationStatus.Auth &&
          <>
            <li className="header__nav-item user">
              <Link
                className="header__nav-link header__nav-link--profile"
                onClick={onMovingToMainPage}
                to={AppRoute.Favorites}
              >
                <div className="header__avatar-wrapper user__avatar-wrapper">
                  <img width="20" height="20" alt="ava" src={authInfo?.avatarUrl}/>
                </div>
                <span className="header__user-name user__name">{authInfo?.email}</span>
              </Link>
            </li>
            <li className="header__nav-item">
              <a
                className="header__nav-link"
                href="/"
                onClick={handleSignOut}
              >
                <span className="header__signout">Sign out</span>
              </a>
            </li>
          </>
        }
        {
          authorizationStatus !== AuthorizationStatus.Auth &&
          <li className="header__nav-item user">
            <Link
              className="header__nav-link header__nav-link--profile"
              to={AppRoute.SignIn}
            >
              <div className="header__avatar-wrapper user__avatar-wrapper">
              </div>
              <span className="header__login">Sign in</span>
            </Link>
          </li>
        }
      </ul>
    </nav>
  );
}

export default Authorization;
