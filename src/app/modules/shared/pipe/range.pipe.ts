import { Pipe, PipeTransform } from '@angular/core';
import range from 'lodash/range';

@Pipe({
  name: 'range'
})
export class RangePipe implements PipeTransform {

  transform(value: number): number[] {
    return range(value);
  }

}
