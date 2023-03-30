import db from '../modules/db';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getAsync = createAsyncThunk(
    'shooping/get',
    async (id) => {
      const response = await db.Shoppings.get(id);
      return response;
    }
  );

  export const createAsync = createAsyncThunk(
    'shooping/create',
    async (entity) => {
      const response = await db.Shoppings.create(entity);
      return response;
    }
  );


export const shoppingSlice = createSlice({
        name: 'shooping',
        initialState: {
            values: [],
            status: "idle"
        },
        reducers: {
        },
        extraReducers: (builder) => {
            builder
              .addCase(getAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(getAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if(action && action.payload && action.payload.value) {
                    state.values = action.payload.value;
                  }
                  else {
                      state.values = [];
                  }
              })
              .addCase(createAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(createAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                return state;
              });
          },
    }
);

// export const { } = categoriesSlice.actions

export const selectValues = (state) => state.shopping.values;
export const selectStatus = (state) => state.shopping.status;

export default shoppingSlice.reducer