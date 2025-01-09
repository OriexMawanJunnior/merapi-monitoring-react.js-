import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import disasterReducer from './disasterSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    disaster: disasterReducer,
  },
});

export default store;