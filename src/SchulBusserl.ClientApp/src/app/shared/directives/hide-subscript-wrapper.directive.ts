import { AfterViewInit, Directive, ElementRef } from "@angular/core";

@Directive({
  selector: "mat-form-field[hideSubscriptWrapper]",
  standalone: true,
})
export class HideSubscriptWrapperDirective implements AfterViewInit {

  public constructor(
    private readonly host: ElementRef<HTMLElement>,
  ) {}

  public ngAfterViewInit(): void {
    const subscriptWrapper = this.host.nativeElement.querySelector<HTMLElement>(
      ".mat-mdc-form-field-subscript-wrapper",
    );

    if (subscriptWrapper != null) {
      subscriptWrapper.style.display = "none";
    }
  }
}