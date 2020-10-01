import {Type} from '@angular/core';
import {clone} from 'lodash';

export function mergeWithDefault<T>(target: T, source: Partial<T>, defaultType: Type<T>): T {
  return Object.assign(
    clone(target) || new defaultType(),
    source || target || {}
  ) as T;
}
