import { configureStore } from '@reduxjs/toolkit';
import allProductsReducer from '../slices/allProductsSlice';
import featuredProductsReducer from '../slices/featuredProductsSlice';
import singleProductReducer from '../slices/singleProductSlice';
import userReducer from '../slices/userSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// TODO: (possibly) find a better naming scheme / unify reducers?
const store = configureStore({
  reducer: {
    all: allProductsReducer,
    featured: featuredProductsReducer,
    single: singleProductReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
