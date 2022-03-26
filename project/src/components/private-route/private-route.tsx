import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks/hooks';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

type PrivateRouteProps = {
  children?: ReactNode | undefined
}

function PrivateRoute(props: PrivateRouteProps) {
  const { children } = props;
  const location = useLocation();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? <div>{children}</div>
      : <Navigate to={AppRoute.SignIn} state={{from: location}} replace/>
  );
}

export default PrivateRoute;
