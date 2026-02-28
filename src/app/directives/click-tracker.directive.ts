import { Directive, HostListener, Input } from '@angular/core';

@Directive({ selector: '[appClickTracker]', standalone: true })
export class ClickTrackerDirective {
  @Input() label!: string;

  @HostListener('click')
  onClick(): void {
    const len = this.label.length;
    console.log('Clicked:', len);
  }
}
