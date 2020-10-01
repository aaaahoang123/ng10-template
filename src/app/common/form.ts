import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms';
import pick from 'lodash/pick';
import cloneDeep from 'lodash/cloneDeep';
import isObject from 'lodash/isObject';
import { ValidatorFn } from '@angular/forms';
import 'reflect-metadata';

export function setValueToForm(form: AbstractControl, data: any, setPristine = false): AbstractControl {
  if (form instanceof FormControl) {
    if (form.value !== data) {
      form.setValue(data);
      if (setPristine) {
        form.markAsPristine();
      }
    }
    return form;
  }
  if (form instanceof FormGroup) {
    Object.keys(form.controls).forEach(key => {
      if (data[key] && !(form.get(key) instanceof FormControl)) {
        setValueToForm(form.get(key), data[key], setPristine);
      }
    });
    form.patchValue(data);
    return form;
  }

  if (form instanceof FormArray && Array.isArray(data)) {
    const templateControl = form.at(0);
    data.forEach((d, i) => form.setControl( i, setValueToForm(cloneDeep(templateControl), d, setPristine) ));
    return form;
  }
  return form;
}

export abstract class BaseFormData<T> {
  protected constructor(source?: Partial<T>) {
    if (source) {
      Object.assign(
        this,
        pick(source, Object.keys(this))
      );
    }
  }
}

export const FORM_VALIDATE_META_KEY = 'form_validate:';

export function UseValidators(validators: ValidatorFn[]|ValidatorFn): (target: any, propertyName: string) => void {
  return (target: object, propertyName: string): void => {
    Reflect.defineMetadata(FORM_VALIDATE_META_KEY + propertyName, validators, target);
  };
}

export const INIT_AS_FORM_CONTROL_META_KEY = 'init_as_form_control_';

export function InitAsFormControl(target: object, propertyName: string): void {
  Reflect.defineMetadata(INIT_AS_FORM_CONTROL_META_KEY + propertyName, true, target);
}

interface ControlOptions {
  validators?: ValidatorFn|ValidatorFn[];
  initAsControl?: boolean;
}

const initAsControl = (options?: ControlOptions): boolean => {
  return options && options.initAsControl;
};

const createControl = (target, options: ControlOptions = {}): AbstractControl => {
  if (initAsControl(options)) {
    return new FormControl(target, options.validators);
  }
  if (Array.isArray(target)) {
    return new FormArray(target.map(item => createControl(item)));
  }
  if (isObject(target) && !(target instanceof Date)) {
    return new FormGroup(
      Object.keys(target).reduce(
        (controls, key) =>
          ({
            ...controls,
            [key]: createControl(
              target[key],
              {
                validators: Reflect.getMetadata(FORM_VALIDATE_META_KEY + key, target) || [],
                initAsControl: Reflect.getMetadata(INIT_AS_FORM_CONTROL_META_KEY + key, target)
              },
            )
          }), {})
    );
  }
  return new FormControl(target, options.validators);
};

export function createForm(input: any): AbstractControl|null {
  if (input) {
    return createControl(input);
  }
  return null;
}

