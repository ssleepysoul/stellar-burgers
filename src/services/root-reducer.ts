import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredients-slice';
import authReducer from './auth-slice';
import constructorReducer from './constructor-slice';
import ordersReducer from './orders-slice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  auth: authReducer,
  burgerConstructor: constructorReducer,
  orders: ordersReducer
});
