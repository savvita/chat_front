import db from '../modules/db';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getAsync = createAsyncThunk(
    'ban/get',
    async () => {
      const response = await db.Bans.get();
      return response;
    }
  );


export const banSlice = createSlice({
        name: 'ban',
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
              });
          },
    }
);

// export const { } = categoriesSlice.actions

export const selectValues = (state) => state.ban.values;
export const selectStatus = (state) => state.ban.status;

export default banSlice.reducer