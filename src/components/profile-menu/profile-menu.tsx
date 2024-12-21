import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { fetchLogoutApi } from '../../services/auth-slice';
import { useDispatch } from '../../services/store';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(fetchLogoutApi());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
