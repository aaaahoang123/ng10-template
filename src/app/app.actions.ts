import {createAction, props} from '@ngrx/store';
import {Payload} from './core';

export const pushParamsToRouter = createAction('[App] PushParamsToRouter', props<Payload>());
