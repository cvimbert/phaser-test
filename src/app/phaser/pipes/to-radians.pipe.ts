import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toRadians'
})
export class ToRadiansPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
