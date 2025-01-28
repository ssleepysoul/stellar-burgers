import reducer, {
  addIngredient,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient,
  initialState,
  ConstructorState
} from './constructor-slice';
import { TIngredient } from '@utils-types';

describe('сonstructor slice', () => {
  it('должен возвращать начальное состояние', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('должен обрабатывать добавление булки', () => {
    const bun = { _id: '1', type: 'bun', name: 'Bun' } as TIngredient;
    const previousState = initialState;
    const expectedState = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        bun: { ...bun, id: bun._id }
      }
    };

    expect(reducer(previousState, addIngredient(bun))).toEqual(expectedState);
  });

  it('должен обрабатывать добавление другого ингредиента', () => {
    const ingredient = { _id: '2', type: 'sauce', name: 'Sauce' } as TIngredient;
    const previousState = initialState;
    const expectedState = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [{ ...ingredient, id: ingredient._id }]
      }
    };

    expect(reducer(previousState, addIngredient(ingredient))).toEqual(
      expectedState
    );
  });

  it('должен обрабатывать удаление ингредиента', () => {
    const ingredient = { _id: '1', type: 'sauce', name: 'Sauce' } as TIngredient;

    const previousState = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [{ ...ingredient, id: ingredient._id }]
      }
    } as ConstructorState;

    const expectedState = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: []
      }
    } as ConstructorState;

    expect(reducer(previousState, removeIngredient(0))).toEqual(expectedState);
  });

  it('должен обрабатывать перемещение ингредиента вверх', () => {
    const ingredient_1 = { _id: '1', type: 'sauce', name: 'Sauce' } as TIngredient;
    const ingredient_2 = { _id: '2', type: 'main', name: 'Main' } as TIngredient;

    const previousState = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [
          { ...ingredient_1, id: ingredient_1._id },
          { ...ingredient_2, id: ingredient_2._id }
        ]
      }
    };

    const expectedState = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [
          { ...ingredient_2, id: ingredient_2._id },
          { ...ingredient_1, id: ingredient_1._id },
        ]
      }
    };

    expect(
      reducer(
        previousState,
        moveUpIngredient({ ...ingredient_2, id: ingredient_2._id })
      )
    ).toEqual(expectedState);
  });

  it('должен обрабатывать перемещение ингредиента вниз', () => {
    const ingredient_1 = { _id: '1', type: 'sauce', name: 'Sauce' } as TIngredient;
    const ingredient_2 = { _id: '2', type: 'main', name: 'Main' } as TIngredient;

    const previousState = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [
          { ...ingredient_2, id: ingredient_2._id },
          { ...ingredient_1, id: ingredient_1._id },
        ]
      }
    };

    const expectedState = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients: [
          { ...ingredient_1, id: ingredient_1._id },
          { ...ingredient_2, id: ingredient_2._id },
        ]
      }
    };

    expect(
      reducer(
        previousState,
        moveDownIngredient({ ...ingredient_2, id: ingredient_2._id })
      )
    ).toEqual(expectedState);
  });


  it('не должен мутировать состояние', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const stateBefore = { ...initialState };
    const stateAfter = reducer(stateBefore, unknownAction);

    expect(stateAfter).toEqual(stateBefore);
  });
});
