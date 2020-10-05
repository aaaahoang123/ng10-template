/**
 * The override of NzInputNumberComponent
 * See here: https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/components/input-number/input-number.component.ts
 *
 * This component resolve that display value lost format when we input.
 * Reason:
 * onModelChange() method not run updateDisplayValue() method, because
 * the input in template has use (ngModelChange) event to call onModelChange().
 * We could use (input) instead.
 */

import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
  Input,
  forwardRef,
  ChangeDetectionStrategy,
  ViewEncapsulation
} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {NzSizeLDSType} from 'ng-zorro-antd/core/types';
import {InputBoolean} from 'ng-zorro-antd/core/util';
import {NzInputNumberComponent} from 'ng-zorro-antd/input-number';

@Component({
  selector: 'app-input-number',
  template: `
    <div class="ant-input-number-handler-wrap">
      <span
        unselectable="unselectable"
        class="ant-input-number-handler ant-input-number-handler-up"
        (mousedown)="up($event)"
        (mouseup)="stop()"
        (mouseleave)="stop()"
        [class.ant-input-number-handler-up-disabled]="disabledUp"
      >
        <i nz-icon nzType="up" class="ant-input-number-handler-up-inner"></i>
      </span>
      <span
        unselectable="unselectable"
        class="ant-input-number-handler ant-input-number-handler-down"
        (mousedown)="down($event)"
        (mouseup)="stop()"
        (mouseleave)="stop()"
        [class.ant-input-number-handler-down-disabled]="disabledDown"
      >
        <i nz-icon nzType="down" class="ant-input-number-handler-down-inner"></i>
      </span>
    </div>
    <div class="ant-input-number-input-wrap">
      <input
        #inputElement
        autocomplete="off"
        class="ant-input-number-input"
        [attr.id]="nzId"
        [attr.autofocus]="nzAutoFocus ? 'autofocus' : null"
        [disabled]="nzDisabled"
        [attr.min]="nzMin"
        [attr.max]="nzMax"
        [placeholder]="nzPlaceHolder"
        [attr.step]="nzStep"
        [attr.inputmode]="nzInputMode"
        (keydown)="onKeyDown($event)"
        (keyup)="stop()"
        [ngModel]="displayValue"
        (input)="onModelChange($event.target.value)"
      />
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputNumberComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    '[class.ant-input-number]': 'true',
    '[class.ant-input-number-focused]': 'isFocused',
    '[class.ant-input-number-lg]': `nzSize === 'large'`,
    '[class.ant-input-number-sm]': `nzSize === 'small'`,
    '[class.ant-input-number-disabled]': 'nzDisabled'
  }
})
// @ts-ignore
export class InputNumberComponent extends NzInputNumberComponent {
  private parsedValue?: string | number;

  @Output() readonly nzBlur = new EventEmitter();
  @Output() readonly nzFocus = new EventEmitter();
  @ViewChild('inputElement', {static: true}) inputElement!: ElementRef<HTMLInputElement>;
  @Input() nzSize: NzSizeLDSType = 'default';
  @Input() nzMin = -Infinity;
  @Input() nzMax = Infinity;
  @Input() nzPrecision?: number;
  @Input() nzPrecisionMode: 'cut' | 'toFixed' | ((value: number | string, precision?: number) => number) = 'toFixed';
  @Input() nzPlaceHolder = '';
  @Input() nzStep = 1;
  @Input() nzInputMode = 'decimal';
  @Input() nzId: string | null = null;
  @Input() @InputBoolean() nzDisabled = false;
  @Input() @InputBoolean() nzAutoFocus = false;

  @Input() nzFormatter: (value: number) => string | number = value => value;
  @Input() nzParser = (value: string) => value
    .trim()
    .replace(/。/g, '.')
    .replace(/[^\w\.-]+/g, '');

  onModelChange(value: string): void {
    super.onModelChange(value);
    this.updateDisplayValue(this.parsedValue as any ?? 0);
  }

}
