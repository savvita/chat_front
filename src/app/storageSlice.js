import db from '../modules/db';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getAsync = createAsyncThunk(
    'storage/get',
    async () => {
      const response = await db.Files.get();
      return response;
    }
  );

  export const downloadAsync = createAsyncThunk(
    'storage/download',
    async (file) => {
      const response = await db.Files.get(file);
      return response;
    }
  );

  export const deleteAsync = createAsyncThunk(
    'storage/delete',
    async (files) => {
      const response = await db.Files.remove(files);
      return response;
    }
  );

export const storageSlice = createSlice({
        name: 'storage',
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
                if(action.payload) {
                    state.values = action.payload;
                  }
                  else {
                      state.values = [];
                  }
              })
              .addCase(downloadAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(downloadAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                return state;
              })
              .addCase(deleteAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(deleteAsync.fulfilled, (state) => {
                state.status = 'idle';
                return state;
              });
          },
    }
);

// export const { } = categoriesSlice.actions

export const selectValues = (state) => state.storage.values;
export const selectStatus = (state) => state.storage.status;

export default storageSlice.reducer