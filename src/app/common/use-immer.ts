import {PayloadAction} from './payload-action';
import createNextState, {Draft, isDraft, isDraftable} from 'immer';

declare type ImmutableCaseReducer<S extends any, A extends any> = (state: S | Draft<S>, action: PayloadAction<A>) => S;
declare type MutableCaseReducer<S extends any, A extends any> = (state: S, action: PayloadAction<A>) => void;

declare type CaseReducer<S extends any, A extends any> = ImmutableCaseReducer<S, A> | MutableCaseReducer<S, A>;

export function useImmer<S extends any, A extends any>(rawReducer: CaseReducer<S, A>): ImmutableCaseReducer<S, A> {
  return (state: S, action: PayloadAction<A>) => {
    if (rawReducer) {
      if (isDraft(state)) {
        // If it's already a draft, we must already be inside a `createNextState` call,
        // likely because this is being wrapped in `createReducer`, `createSlice`, or nested
        // inside an existing draft. It's safe to just pass the draft to the mutator.
        const draft = state as Draft<S>; // We can assume this is already a draft
        const result = rawReducer(draft as any, action);

        if (typeof result === 'undefined') {
          return state;
        }

        return result;
      } else if (!isDraftable(state)) {
        // If state is not draftable (ex: a primitive, such as 0), we want to directly
        // return the caseReducer func and not wrap it with produce.
        const result = rawReducer(state as any, action);

        if (typeof result === 'undefined') {
          if (state === null) {
            return state;
          }
          throw Error(
            'A case reducer on a non-draftable value must not return undefined'
          );
        }

        return result;
      } else {
        // @ts-ignore createNextState() produces an Immutable<Draft<S>> rather
        // than an Immutable<S>, and TypeScript cannot find out how to reconcile
        // these two types.
        return createNextState(state, (draft: Draft<S>) => {
          return rawReducer(draft as any, action);
        }) as any;
      }
    }

    return state;
  };
}
