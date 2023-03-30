import { configureStore } from "@reduxjs/toolkit";

import authReducer from './authSlice';
import subscriptionReducer from './subscriptionSlice';
import banReducer from './banSlice';
import shoppingReducer from './shoppingSlice';
import requestReducer from './requestSlice';
import rekognitionReducer from './rekoginitionSlice';

export const store = configureStore( {
    reducer: {
        auth: authReducer,
        subscription: subscriptionReducer,
        ban: banReducer,
        shopping: shoppingReducer,
        request: requestReducer,
        rekognition: rekognitionReducer
    }
});