import { Pipe, PipeTransform } from '@angular/core';
import {enumToSelectEntries, SelectEntry} from '../../../core/enum-to-select-entries';

@Pipe({
  name: 'enumToSelectEntries'
})
export class EnumToSelectEntriesPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): SelectEntry[] {
    return enumToSelectEntries(value);
  }

}
