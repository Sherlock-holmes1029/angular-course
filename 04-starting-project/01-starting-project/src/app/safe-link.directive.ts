import { Directive, ElementRef, inject, input, Input } from '@angular/core';

@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onConfirmLeavePage($event)',
  },
})
export class SafeLinkDirective {
  queryParam = input('myapp', { alias: 'appSafeLink' });
    private hostElementRef=inject<ElementRef<HTMLAnchorElement>>(ElementRef)

  constructor() {
    console.log('Safe Link directive');
  }

  onConfirmLeavePage(event: MouseEvent) {
    const wantToLeave = this.hostElementRef.nativeElement.href
    if (wantToLeave) {
      const address = (event.target as HTMLAnchorElement).href;
      (event.target as HTMLAnchorElement).href =
        address + `?from=${this.queryParam()}`;
      return;
    }
    event.preventDefault();
  }
}
