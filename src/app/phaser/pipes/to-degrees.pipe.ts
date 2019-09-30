import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toDegrees'
})
export class ToDegreesPipe implements PipeTransform {

  transform(value: number): number {
    return Math.floor((value / 2 * Math.PI) * 360);
  }

}
