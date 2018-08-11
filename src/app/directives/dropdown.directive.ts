import { Directive, HostBinding, Input, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  constructor(private el: ElementRef,private renderer: Renderer2) { }

  isOpened: boolean = false;

  @HostListener('click') toggle() {
    if (this.isOpened) {
      this.renderer.removeClass(this.el.nativeElement, 'open');
    } else {
      this.renderer.addClass(this.el.nativeElement, 'open');

    }
    this.isOpened = !this.isOpened;
  }
}
