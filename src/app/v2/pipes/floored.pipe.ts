import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'floored'
})
export class FlooredPipe implements PipeTransform {

  transform(value: number): number {
    return Math.floor(value);
  }

}
