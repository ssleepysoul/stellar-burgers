import React from 'react';
import { RootState, useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { Navigate } from 'react-router';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

export const ProtectedRouteAuth = ({ children }: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(
    (state: RootState) => state.auth.isAuthChecked
  );

  const user = useSelector((state: RootState) => state.auth.user);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!user) {
    return <Navigate replace to='/login' />;
  }

  return children;
};
