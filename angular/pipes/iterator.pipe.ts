import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'objiter'})
export class ObjectIteratorPipe implements PipeTransform {
  transform(obj: Object): any {
    if (obj === undefined || obj === null) {
      return [];
    }

    return Object.keys(obj).map((key) => {
      return { key: key, value: obj[key] };
    });
  }
}
