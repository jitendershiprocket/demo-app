import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'toUpper', standalone: true })
export class UppercasePipe implements PipeTransform {
  transform(value: string | null): string {
    return (value as string).toUpperCase();
  }
}
