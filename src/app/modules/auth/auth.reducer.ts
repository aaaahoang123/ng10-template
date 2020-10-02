import {createAction, createReducer, on, props} from '@ngrx/store';
import {User} from '../../models/user.interface';
import { Payload, PayloadAction, useImmer } from '../../common';
import {LoginForm} from './login/login.form';
import {JwtPayload} from '../../models/jwt-payload.interface';
import {JwtHelperService} from '@auth0/angular-jwt';

const jwt = new JwtHelperService();

export class AuthState {
  user: User;
  loginFormLoading = false;
  tokenInfo?: JwtPayload;
  authenticated = false;
}

export const loadUserData = createAction('[Auth] LoadUserData');
export const appUserLoaded = createAction('[App] AppUserLoaded', props<Payload<User>>());
export const login = createAction('[Auth] Login', props<Payload<LoginForm>>());
export const loginComplete = createAction('[Auth] LoginComplete', props<Payload<boolean>>());
export const authTokenChanged = createAction('[Auth] AuthTokenChanged', props<Payload<string>>());

const onUserLoaded = (state: AuthState, action: PayloadAction<User>) => {
  state.user = action.payload;
  state.loginFormLoading = false;
};

const onLogin = (state: AuthState) => {
  state.loginFormLoading = true;
};

const onLoginComplete = (state: AuthState, action: PayloadAction<boolean>): AuthState => ({...state, loginFormLoading: false});

const onAuthTokenChanged = (state: AuthState, action: PayloadAction<string>): void => {
  const tokenInfo = jwt.decodeToken(action.payload || '') as JwtPayload;
  state.tokenInfo = tokenInfo;
  state.authenticated = (new Date().valueOf() / 1000) < (tokenInfo?.exp || 0);
};

const reducer = createReducer(
  {...new AuthState()},
  on(appUserLoaded, useImmer(onUserLoaded)),
  on(login, useImmer(onLogin)),
  on(loginComplete, onLoginComplete),
  on(authTokenChanged, useImmer(onAuthTokenChanged))
);

export const authReducer = (state: AuthState, action) => reducer(state, action);
