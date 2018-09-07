import {Action} from 'redux';

export interface PayloadAction<T = any> extends Action {
  payload: T;
}
