import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputNumberComponent} from './input-number.component';
import {FormsModule} from '@angular/forms';
import {NzIconModule} from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [InputNumberComponent],
  imports: [
    CommonModule, FormsModule, NzIconModule
  ],
  exports: [InputNumberComponent]
})
export class InputNumberModule {
}
