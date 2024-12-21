import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  TConstructorIngredient,
  TConstructorItems,
  TIngredient
} from '@utils-types';
import { orderBurgerApi } from '../utils/burger-api';
import { fetchIngredients } from './ingredients-slice';
import { TOrder } from '../utils/types';

type ConstructorState = {
  orderModalData: null | TOrder;
  orderRequest: boolean;
  constructorItems: TConstructorItems;
};

const initialState: ConstructorState = {
  orderModalData: null,
  orderRequest: false,
  constructorItems: {
    bun: null,
    ingredients: []
  }
};

export const fetchOrderBurgerApi = createAsyncThunk(
  'auth/fetchOrderBurgerApi',
  async (data: string[]) => await orderBurgerApi(data)
);

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      if (action.payload.type === 'bun') {
        state.constructorItems.bun = {
          ...action.payload,
          id: action.payload._id
        };
      } else {
        state.constructorItems.ingredients.push({
          ...action.payload,
          id: action.payload._id
        });
      }
    },
    removeIngredient: (state, action: PayloadAction<number>) => {
      const a = state.constructorItems.ingredients.filter(
        (_item, index) => index !== action.payload
      );

      console.log(a);

      state.constructorItems.ingredients = a;
    },
    moveUpIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const index = state.constructorItems.ingredients.findIndex(
        (item) => item.id === action.payload.id
      );
      const [element] = state.constructorItems.ingredients.splice(index, 1);
      state.constructorItems.ingredients.splice(index - 1, 0, element);
    },
    moveDownIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      const index = state.constructorItems.ingredients.findIndex(
        (item) => item.id === action.payload.id
      );
      const [element] = state.constructorItems.ingredients.splice(index, 1);
      state.constructorItems.ingredients.splice(index + 1, 0, element);
    },
    clearModalData: (state) => {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderBurgerApi.pending, (state, action) => {
        state.orderRequest = true;
        state.orderModalData = null;
      })
      .addCase(fetchOrderBurgerApi.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
        state.constructorItems = {
          bun: null,
          ingredients: []
        };
      })
      .addCase(fetchOrderBurgerApi.rejected, (state, action) => {
        state.orderRequest = false;
      });
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient,
  clearModalData
} = constructorSlice.actions;
export default constructorSlice.reducer;
