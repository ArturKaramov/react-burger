import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IIngredient, IngrType, TOrderResponse } from '../types';
import { getIngredients, setOrder } from '../thunks/burger';

export type TBurgerState = {
  ingredientsRequest: boolean;
  ingredientsFailed: boolean;
  orderRequest: boolean;
  orderFailed: boolean;
  items: Array<IIngredient>;
  constructor: Array<IIngredient>;
  order: number;
};

const initialState: TBurgerState = {
  ingredientsRequest: false,
  ingredientsFailed: false,
  orderRequest: false,
  orderFailed: false,
  items: [],
  constructor: [],
  order: 0,
};

export const burgerSlice = createSlice({
  name: 'burger',
  initialState,
  reducers: {
    clearOrder: (state: TBurgerState) => {
      state.order = initialState.order;
      state.constructor = initialState.constructor;
    },

    addIngr: (state: TBurgerState, action: PayloadAction<IIngredient>) => {
      state.constructor =
        action.payload.type === IngrType.BUN
          ? [action.payload, ...state.constructor.slice(1, -1), action.payload]
          : [
              ...state.constructor.slice(0, -1),
              action.payload,
              state.constructor[state.constructor.length - 1],
            ];
    },
    deleteIngr: (state: TBurgerState, action: PayloadAction<number>) => {
      state.constructor = [
        ...state.constructor.slice(0, action.payload),
        ...state.constructor.slice(action.payload + 1),
      ];
    },
    moveIngr: (state: TBurgerState, action: PayloadAction<Array<IIngredient>>) => {
      state.constructor = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state: TBurgerState) => {
        state.ingredientsRequest = true;
        state.ingredientsFailed = false;
      })
      .addCase(getIngredients.rejected, (state: TBurgerState) => {
        state.ingredientsRequest = false;
        state.ingredientsFailed = true;
      })
      .addCase(
        getIngredients.fulfilled,
        (
          state: TBurgerState,
          action: PayloadAction<{ success: boolean; data: Array<IIngredient> }>,
        ) => {
          state.ingredientsFailed = false;
          state.ingredientsRequest = false;
          state.items = action.payload.data;
        },
      )
      .addCase(setOrder.pending, (state: TBurgerState) => {
        state.orderRequest = true;
        state.orderFailed = false;
      })
      .addCase(setOrder.rejected, (state: TBurgerState) => {
        state.orderFailed = true;
        state.orderRequest = false;
      })
      .addCase(setOrder.fulfilled, (state: TBurgerState, action: PayloadAction<TOrderResponse>) => {
        console.log(action.payload);
        state.orderRequest = false;
        state.orderFailed = false;
        state.order = action.payload.order.number;
      });
  },
});

export const { clearOrder, addIngr, deleteIngr, moveIngr } = burgerSlice.actions;

export type TBurgerActions = typeof burgerSlice.actions;

export default burgerSlice.reducer;
