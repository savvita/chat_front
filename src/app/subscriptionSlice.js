import db from '../modules/db';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getAsync = createAsyncThunk(
    'subscription/get',
    async () => {
      const response = await db.Subscriptions.get();
      return response;
    }
  );


export const subscriptionSlice = createSlice({
        name: 'subscription',
        initialState: {
            values: [],
            selected: null,
            status: "idle"
        },
        reducers: {
          set: (state, action) => {
            if(action && action.payload) {
              state.selected = action.payload;
            }
            else {
              state.selected = null;
            }
          }, 
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
              });
          },
    }
);

export const { set } = subscriptionSlice.actions

export const selectValues = (state) => state.subscription.values;
export const selectSelected= (state) => state.subscription.selected;
export const selectStatus = (state) => state.subscription.status;

export default subscriptionSlice.reducer