import { expect, test } from '@jest/globals';
import { rootReducer } from './root-reducer';
import { configureStore } from '@reduxjs/toolkit';
import { initialState as initialIngredientsState } from './ingredients-slice';
import { initialState as initialAuthState} from './auth-slice';
import { initialState as initialConstructorState} from './constructor-slice';
import { initialState as initialOrdersState} from './orders-slice';


describe('rootReducer', () => {
  it('все редьюсеры должны быть инициализированны с коректным начальным состояниес', () => {
    const store = configureStore({ reducer: rootReducer });
    const state = store.getState();

    expect(state.ingredients).toEqual(initialIngredientsState);
    expect(state.auth).toEqual(initialAuthState);
    expect(state.burgerConstructor).toEqual(initialConstructorState);
    expect(state.orders).toEqual(initialOrdersState);
  });
});
