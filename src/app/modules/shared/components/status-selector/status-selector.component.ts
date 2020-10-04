import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {InputBoolean} from 'ng-zorro-antd/core/util';
import {SimpleControlValueAccessor} from '../../../../core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-status-selector',
  templateUrl: './status-selector.component.html',
  styleUrls: ['./status-selector.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StatusSelectorComponent),
      multi: true
    }
  ]
})
export class StatusSelectorComponent extends SimpleControlValueAccessor implements OnInit {

  @Input() status = {};
  @Input() @InputBoolean() nzAllowClear: boolean;
  @Input() nzSize: 'default' | 'small' | 'large' = 'default';
  @Input() nzPlaceHolder: string;
  @Input() set enumName(value: string) {
    this.enumPrefix = value ? `${value}.` : '';
  }

  enumPrefix = '';
  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}
