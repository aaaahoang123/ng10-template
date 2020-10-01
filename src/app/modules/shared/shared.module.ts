import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

const sharedModules = [
  CommonModule,
  ReactiveFormsModule,
  HttpClientModule
];

@NgModule({
  declarations: [],
  imports: sharedModules,
  exports: sharedModules
})
export class SharedModule { }
