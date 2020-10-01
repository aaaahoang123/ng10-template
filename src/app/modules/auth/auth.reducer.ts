import {createAction, createReducer, on, props} from '@ngrx/store';
import {User} from '../../models/user.interface';
import {PayloadAction, useImmer} from '../../common';

export class AuthState {
  user: User;
}

export const appUserLoaded = createAction('[App] AppUserLoaded', props<PayloadAction<User>>());

const onUserLoaded = (state: AuthState, action: PayloadAction<User>) => {
  return {
    ...state,
    user: action.payload
  };
};

const reducer = createReducer(
  {...new AuthState()},
  on(appUserLoaded, onUserLoaded)
);

export const authReducer = (state: AuthState, action) => reducer(state, action);
