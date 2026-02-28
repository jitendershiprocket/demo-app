import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'slugify', standalone: true })
export class SlugifyPipe implements PipeTransform {
  transform(value: string | null): string {
    return (value as string).toLowerCase().replace(/\s+/g, '-');
  }
}
