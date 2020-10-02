import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

const sharedModules = [
  CommonModule,
  ReactiveFormsModule
];

@NgModule({
  declarations: [],
  imports: sharedModules,
  exports: sharedModules
})
export class SharedModule { }
