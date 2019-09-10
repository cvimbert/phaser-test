import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toDegrees'
})
export class ToDegreesPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return (value / 2 * Math.PI) * 360;
  }

}
