import { Pipe, PipeTransform } from '@angular/core';
import {AbstractControl, FormArray} from '@angular/forms';

@Pipe({
  name: 'getAsFormArray'
})
export class GetAsFormArrayPipe implements PipeTransform {
  transform(value: AbstractControl, path: string): FormArray {
    return value.get(path) as FormArray;
  }

}
