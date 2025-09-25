import { Directive, ElementRef, AfterViewInit, inject } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]',
  standalone: true,
})
export class AutoFocusDirective implements AfterViewInit {
  private el = inject(ElementRef);

  ngAfterViewInit() {
    // Small timeout ensures DOM is ready
    setTimeout(() => {
      this.el.nativeElement.focus();
    });
  }
}
