import db from '../modules/db';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

  export const rekognizeImageAsync = createAsyncThunk(
    'rekognition/text',
    async (img) => {
      const response = await db.Rekoginition.image(img);
      return response;
    }
  );

  export const rekognizeVoiceAsync = createAsyncThunk(
    'rekognition/voice',
    async (props) => {
      const response = await db.Rekoginition.voice(props.file, props.lang);
      return response;
    }
  );


export const rekognitionSlice = createSlice({
        name: 'rekognition',
        initialState: {
            value: null,
            status: "idle"
        },
        reducers: {
            reset: (state) => {
                state.value = null;
              }, 
        },
        extraReducers: (builder) => {
            builder
              .addCase(rekognizeImageAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(rekognizeImageAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if(action && action.payload && action.payload.value) {
                    state.value = action.payload.value;
                  }
                  else {
                      state.value = null;
                  }
              })
              .addCase(rekognizeVoiceAsync.pending, (state) => {
                state.status = 'loading';
              })
              .addCase(rekognizeVoiceAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                if(action && action.payload && action.payload.value) {
                    state.value = action.payload.value;
                  }
                  else {
                      state.value = null;
                  }
              });
          },
    }
);

export const { reset } = rekognitionSlice.actions

export const selectValue = (state) => state.rekognition.value;
export const selectStatus = (state) => state.rekognition.status;

export default rekognitionSlice.reducer