import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '../utils/types';
import { getIngredientsApi } from '../utils/burger-api';

type IngredientsState = {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
  ingredientData: null | TIngredient;
};

const initialState: IngredientsState = {
  ingredients: [],
  isLoading: false,
  error: null,
  ingredientData: null
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => await getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    getIngredientById: (state, action: PayloadAction<string>) => {
      state.ingredientData =
        state.ingredients.find((item) => item._id === action.payload) || null;
    },
    clearIngredientData: (state) => {
      state.ingredientData = null;
    }
  },
  selectors: {
    selectIngredients: (sliceState) => sliceState.ingredients,
    selectIsLoading: (sliceState) => sliceState.isLoading
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.isLoading = false;
      state.ingredients = action.payload;
    });
    builder.addCase(fetchIngredients.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  }
});
// prettier-ignore
export const { getIngredientById, clearIngredientData } =
  ingredientsSlice.actions;

export default ingredientsSlice.reducer;
