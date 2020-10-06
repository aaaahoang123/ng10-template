import {ControlValueAccessor} from '@angular/forms';

export abstract class SimpleControlValueAccessor<M = any> implements ControlValueAccessor {
  isDisabled: boolean;
  protected propagateChange: (_: M) => void;
  model: M;

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  writeValue(obj: any): void {
    this.model = obj;
  }

  onModelChange($event: M): void {
    this.model = $event;
    this.propagateChange?.($event);
  }
}
