import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
  shallowEqual,
} from 'react-redux';
import { AppDispatch, RootState } from '../types';
import { ThunkAction } from 'redux-thunk';
import { store } from '../store';

export const useDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
