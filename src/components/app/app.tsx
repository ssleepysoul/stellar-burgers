import { ConstructorPage } from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AppHeader } from '@components';
import { Feed } from '@pages';
import { ProtectedRouteAuth } from '../protected-route-auth';
import { ProtectedRouteNotAuth } from '../protected-route-not-auth';
import { Login } from '@pages';
import { Register } from '@pages';
import { ForgotPassword } from '@pages';
import { ResetPassword } from '@pages';
import { Profile } from '@pages';
import { ProfileOrders } from '@pages';
import { NotFound404 } from '@pages';
import { Modal } from '@components';
import { OrderInfo } from '@components';
import { IngredientDetails } from '@components';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { fetchGetUserApi } from '../../services/auth-slice';
import {
  clearIngredientData,
  fetchIngredients
} from '../../services/ingredients-slice';
import { clearOrder } from '../../services/orders-slice';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderData = useSelector((state: RootState) => state.orders.order);

  useEffect(() => {
    dispatch(fetchGetUserApi());
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />}>
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title={'Детали ингредиента'}
                onClose={() => {
                  dispatch(clearIngredientData());
                  navigate('/');
                }}
              >
                <IngredientDetails />
              </Modal>
            }
          />
        </Route>
        <Route path='/feed' element={<Feed />}>
          <Route
            path=':number'
            element={
              <Modal
                title={`#${String(orderData?.number).padStart(6, '0')}`}
                onClose={() => {
                  dispatch(clearOrder());
                  navigate('/feed');
                }}
              >
                <OrderInfo />
              </Modal>
            }
          />
        </Route>
        <Route path='*' element={<NotFound404 />} />
        <Route
          path='/login'
          element={
            <ProtectedRouteNotAuth>
              <Login />
            </ProtectedRouteNotAuth>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRouteNotAuth>
              <Register />
            </ProtectedRouteNotAuth>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRouteNotAuth>
              <ForgotPassword />
            </ProtectedRouteNotAuth>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRouteNotAuth>
              <ResetPassword />
            </ProtectedRouteNotAuth>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRouteAuth>
              <Profile />
            </ProtectedRouteAuth>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRouteAuth>
              <ProfileOrders />
            </ProtectedRouteAuth>
          }
        >
          <Route
            path=':number'
            element={
              <Modal
                title={`#${String(orderData?.number).padStart(6, '0')}`}
                onClose={() => {
                  navigate('/profile/orders');
                  dispatch(clearOrder());
                }}
              >
                <OrderInfo />
              </Modal>
            }
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
