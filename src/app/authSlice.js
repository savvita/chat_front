import db from '../modules/db';
import token from '../modules/token';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const signInAsync = createAsyncThunk(
    'auth/signin',
    async (authModel) => {
      if(!authModel) {
        return null;
      }
      const response = await db.signIn(authModel.login, authModel.password);
      return response;
    }
  );

  export const signUpAsync = createAsyncThunk(
    'auth/signup',
    async (authModel) => {
        if(!authModel) {
            return null;
          }
        const response = await db.signUp(authModel.login, authModel.password);
      return response;
    }
  );

  export const getAsync = createAsyncThunk(
    'auth/get',
    async () => {
      const response = await db.Users.get();
      return response;
    }
  );

  export const getByIdAsync = createAsyncThunk(
    'auth/getbyid',
    async () => {
      const response = await db.Users.getProfile();
      return response;
    }
  );

  export const banAsync = createAsyncThunk(
    'auth/ban',
    async (props) => {
      if(!props) {
        return undefined;
      }

      const response = await db.Users.ban(props.id, props.ban);
      return response;
    }
  );

  export const updateAsync = createAsyncThunk(
    'auth/update',
    async (entity) => {
      const response = await db.Users.update(entity);
      return response;
    }
  );


export const authSlice = createSlice({
        name: 'auth',
        initialState: {
            values: [],
            currentValue: token.getUserInfo().expired ? null : token.getUserInfo(),
            userInfo: {},
            status: "idle"
        },
        reducers: {
          logOut: (state) => {
            token.logOut();
            state.currentValue  = null;
          },
          refresh: (state) => {
            state.currentValue  = token.getUserInfo().expired ? null : token.getUserInfo();
          }
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
              .addCase(signInAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(signInAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if(action && action.payload && action.payload.value) {
                  state.currentValue = token.getUserInfo();
                  state.userInfo = action.payload.value;
                }
                else {
                  state.currentValue = null;
                  state.userInfo = {};
                }
                
                return state;
              })
              .addCase(banAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(banAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                return state;
              })
              .addCase(signUpAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(signUpAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if(action && action.payload && action.payload.value) {
                  state.currentValue = token.getUserInfo();
                  state.userInfo = action.payload.value;
                }
                else {
                  state.currentValue = null;
                }
                return state;
              })
              .addCase(getByIdAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(getByIdAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if(action && action.payload && action.payload.value) {
                  state.currentValue = token.getUserInfo();
                  state.userInfo = action.payload.value;
                }
                else {
                  state.currentValue = null;
                }
                return state;
              })
              .addCase(updateAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(updateAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if(action && action.payload && action.payload.value) {
                    state.currentValue = token.getUserInfo()
                  }
                  else {
                    state.currentValue = null;
                  }
                return state;
              });
          },
    }
);

export const { logOut, refresh } = authSlice.actions

export const selectValues = (state) => state.auth.values;
export const selectCurrent = (state) => state.auth.currentValue;
export const selectUserInfo = (state) => state.auth.userInfo;
export const selectStatus = (state) => state.auth.status;

export default authSlice.reducer