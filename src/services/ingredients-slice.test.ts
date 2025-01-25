import reducer, { initialState, fetchIngredients } from './ingredients-slice';
import { TIngredient } from '@utils-types';

describe('редьюсер ingredients', () => {
  it('должен устанавливать isLoading в true при экшене pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен сохранять данные ингредиентов и устанавливать isLoading в false при экшене fulfilled', () => {
    const ingredients: TIngredient[] = [
      { _id: '1', type: 'bun', name: 'Bun' } as TIngredient,
      { _id: '2', type: 'sauce', name: 'Sauce' } as TIngredient,
    ];
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: ingredients
    };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual(ingredients);
  });

  it('должен сохранять ошибку и устанавливать isLoading в false при экшене rejected', () => {
    const errorMessage = 'Ошибка загрузки ингредиентов';
    const action = {
      type: fetchIngredients.rejected.type,
      payload: errorMessage
    };
    const state = reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});
