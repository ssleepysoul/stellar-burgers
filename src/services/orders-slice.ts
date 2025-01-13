import { TOrder, TOrdersData } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getFeedsApi,
  getOrdersApi,
  getOrderByNumberApi
} from '../utils/burger-api';

type OrdersState = {
  feeds: TOrdersData;
  feedsIsLoading: boolean;
  feedsError: null | {};
  orders: TOrder[];
  ordersIsLoading: boolean;
  ordersError: null | {};
  order: TOrder | null;
  orderIsLoading: boolean;
  orderError: null | {};
};

const initialState: OrdersState = {
  feeds: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  feedsIsLoading: false,
  feedsError: null,
  orders: [],
  ordersIsLoading: false,
  ordersError: null,
  order: null,
  orderIsLoading: false,
  orderError: null
};

export const fetchGetFeedsApi = createAsyncThunk(
  'orders/fetchGetFeedsApi',
  async () => {
    const response = await getFeedsApi();
    return response;
  }
);

export const fetchGetOrdersApi = createAsyncThunk(
  'orders/fetchGetOrdersApi',
  async () => {
    const response = await getOrdersApi();
    return response;
  }
);

export const fetchGetOrderByNumberApi = createAsyncThunk(
  'orders/fetchGetOrderByNumberApi',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    return response;
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetFeedsApi.pending, (state) => {
        state.feedsIsLoading = true;
      })
      .addCase(fetchGetFeedsApi.rejected, (state, action) => {
        state.feedsIsLoading = false;
        state.feedsError = action.payload as null;
      })
      .addCase(fetchGetFeedsApi.fulfilled, (state, action) => {
        state.feedsIsLoading = false;
        state.feeds = action.payload;

        // console.log('fetchGetFeedsApi.fulfilled: ', action.payload);
      })
      .addCase(fetchGetOrdersApi.pending, (state) => {
        state.ordersIsLoading = true;
      })
      .addCase(fetchGetOrdersApi.rejected, (state, action) => {
        state.ordersIsLoading = false;
        state.ordersError = action.payload as null;
      })
      .addCase(fetchGetOrdersApi.fulfilled, (state, action) => {
        state.ordersIsLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchGetOrderByNumberApi.pending, (state) => {
        state.orderIsLoading = true;
      })
      .addCase(fetchGetOrderByNumberApi.rejected, (state, action) => {
        state.orderIsLoading = false;
        state.orderError = action.payload as null;
      })
      .addCase(fetchGetOrderByNumberApi.fulfilled, (state, action) => {
        state.ordersIsLoading = false;
        state.order = action.payload.orders[0];
      });
  }
});

export const { clearOrder } = ordersSlice.actions;

export default ordersSlice.reducer;
