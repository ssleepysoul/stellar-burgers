import { FC, useMemo } from 'react';
import { TConstructorIngredient, TConstructorItems } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { RootState, useSelector } from '../../services/store';
import { useDispatch } from '../../services/store';
import {
  fetchOrderBurgerApi,
  clearModalData
} from '../../services/constructor-slice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const orderRequest = useSelector(
    (state: RootState) => state.burgerConstructor.orderRequest
  );
  const constructorItems = useSelector(
    (state: RootState) => state.burgerConstructor.constructorItems
  );

  const orderModalData = useSelector(
    (state: RootState) => state.burgerConstructor.orderModalData
  );

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      if (!constructorItems.bun || orderRequest) return;
      const items = [
        constructorItems.bun.id,
        ...constructorItems.ingredients.map((item) => item.id)
      ];
      dispatch(fetchOrderBurgerApi(items));
    }
  };
  const closeOrderModal = () => {
    dispatch(clearModalData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
