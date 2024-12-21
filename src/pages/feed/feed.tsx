import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { RootState, useSelector } from '../../services/store';
import { useDispatch } from '../../services/store';
import { fetchGetFeedsApi } from '../../services/orders-slice';
import { Outlet } from 'react-router-dom';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector(
    (state: RootState) => state.orders.feeds?.orders
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGetFeedsApi());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <>
      <FeedUI orders={orders} handleGetFeeds={() => {}} />
      <Outlet />
    </>
  );
};
