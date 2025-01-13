import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { RootState, useSelector } from '../../services/store';
import { useDispatch } from '../../services/store';
import { fetchGetOrdersApi } from '../../services/orders-slice';
import { Outlet } from 'react-router-dom';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(
    (state: RootState) => state.orders.orders
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetOrdersApi());
  }, []);

  return (
    <>
      <ProfileOrdersUI orders={orders} />
      <Outlet />
    </>
  );
};
