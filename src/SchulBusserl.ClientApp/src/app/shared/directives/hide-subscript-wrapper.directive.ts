import { AfterViewInit, Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: 'mat-form-field[hideSubscriptWrapper]',
  standalone: true,
})
export class HideSubscriptWrapperDirective implements AfterViewInit {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  public ngAfterViewInit(): void {
    const subscriptWrapper = this.host.nativeElement.querySelector<HTMLElement>(
      '.mat-mdc-form-field-subscript-wrapper',
    );

    if (subscriptWrapper != null) {
      subscriptWrapper.style.display = 'none';
    }
  }
}
