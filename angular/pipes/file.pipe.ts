import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'basename'})
export class FileBaseNamePipe implements PipeTransform {
  transform(path: string): string {
    return path.split(/[\\/]/).pop();
  }
}
