import { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

type PrivateRouteProps = PropsWithChildren<{
  authorizationStatus: AuthorizationStatus
}>

function PrivateRoute(props: PrivateRouteProps) {
  const {children, authorizationStatus} = props;
  const location = useLocation();

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? <div>{children}</div>
      : <Navigate to={AppRoute.SignIn} state={{from: location}} replace/>
  );
}

export default PrivateRoute;
