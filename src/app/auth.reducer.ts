import {createAction, createReducer, on, props} from '@ngrx/store';
import {User} from './models/user.interface';

export class AuthState {
  user: User;
}

export const initialApplication = createAction('[App] InitialApplication');
export const appUserLoaded = createAction('[App] AppUserLoaded', props<User>());

const reducer = createReducer(
  {...new AuthState()},
  on(appUserLoaded, (state, action) => ({...state, user: action}))
);

export const authReducer = (state: AuthState, action) => reducer(state, action);
