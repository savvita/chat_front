import db from '../modules/db';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getAsync = createAsyncThunk(
    'request/get',
    async () => {
      const response = await db.Requests.get();
      return response;
    }
  );

  export const textAsync = createAsyncThunk(
    'request/text',
    async (text) => {
      const response = await db.Requests.createText(text);
      return response;
    }
  );


export const requestSlice = createSlice({
        name: 'request',
        initialState: {
            values: [],
            current: null,
            status: "idle"
        },
        reducers: {
            reset: (state) => {
                state.current = null;
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
              })
              .addCase(textAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(textAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if(action && action.payload && action.payload.value) {
                    state.current = action.payload.value;
                  }
                  else {
                      state.current = null;
                  }
              });
          },
    }
);

export const { reset } = requestSlice.actions

export const selectValues = (state) => state.request.values;
export const selectCurrent = (state) => state.request.current;
export const selectStatus = (state) => state.request.status;

export default requestSlice.reducer