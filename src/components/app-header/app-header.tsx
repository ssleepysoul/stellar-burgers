import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { RootState, useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const userName = useSelector((state: RootState) => state.auth.user?.name);

  return <AppHeaderUI userName={userName} />;
};
