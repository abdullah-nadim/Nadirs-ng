import { ViewChild, TemplateRef, ViewContainerRef, AfterViewInit, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, NgModel } from '@angular/forms';

@Component({
  selector: '[validation-messages]',
  standalone: true,
  imports: [CommonModule],
  template: `
<!-- <ng-template #content> -->
  <small *ngFor="let msg of errors" class="text-danger">{{ msg }}</small>
<!-- </ng-template> -->
`})
export class ValidationMessages implements AfterViewInit {
  // @ViewChild('content', { read: TemplateRef }) contentTemplate!: TemplateRef<any>;
  @Input('validation-messages') control!: AbstractControl | NgModel;
  @Input() controlName!: string;
  @Input() customMessages: { [key: string]: string } = {};
  @Input() submitted: boolean = false;

  constructor(private viewContainerRef: ViewContainerRef) { }

  ngAfterViewInit(): void {
    // this.viewContainerRef.createEmbeddedView(this.contentTemplate);
  }

  get errors(): string[] {
    const control = this.control;
    //console.log(control);
    if (!control || !control.errors || !this.isTouched(control)) {
      return [];
    }

    return Object.keys(control.errors).map(errorKey => {
      // Use custom message if provided
      if (this.customMessages[errorKey]) {
        return this.customMessages[errorKey];
      }

      // Default fallback messages
      const errorValue = control.errors![errorKey];
      switch (errorKey) {
        case 'required':
          return 'This field is required.';
        case 'minlength':
          return `Minimum length is ${errorValue.requiredLength}.`;
        case 'maxlength':
          return `Maximum length is ${errorValue.requiredLength}.`;
        case 'email':
          return 'Invalid email format.';
        case 'pattern':
          return 'Invalid format.';
        case 'forbiddenName':
          return 'This name is not allowed.';
        case 'mustMatch':
          return 'Fields must match.';
        default:
          return `Invalid: ${errorKey}`;
      }
    });
  }

  private isTouched(control: any): boolean {
    // Works for both NgModel and FormControl
    return control.touched || control.dirty;
  }
}
