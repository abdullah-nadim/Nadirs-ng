import {
  Directive,
  Input,
  ElementRef,
  OnInit,
  DoCheck,
  Renderer2
} from '@angular/core';
import { NgModel, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appValidationMessage]',
  standalone: true
})
export class ValidationMessageDirective implements OnInit, DoCheck {
  @Input('appValidationMessage') control: NgModel | AbstractControl | null = null;
  @Input() validationMessages: { [key: string]: string } = {};

  private errorContainer: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.errorContainer = this.renderer.createElement('div');
    this.renderer.setStyle(this.errorContainer, 'color', 'red');
    this.renderer.setStyle(this.errorContainer, 'fontSize', '0.875rem');
    this.renderer.appendChild(this.el.nativeElement.parentNode, this.errorContainer);
  }

  ngOnInit() {
    if (!this.control) {
      const nativeElement = this.el.nativeElement;
      // Fallback (for NgModel bound inputs only)
      this.control = nativeElement?.__ngContext__?.[8] || null;
    }
  }

  ngDoCheck() {
    if (!this.control || !this.control.errors || !this.isTouched()) {
      this.errorContainer.innerHTML = '';
      return;
    }

    const messages = this.getMessages(this.control.errors);
    this.errorContainer.innerHTML = messages.map(msg => `<div>${msg}</div>`).join('');
  }

  private isTouched(): boolean {
    return (this.control as any).touched || (this.control as any).dirty;
  }

  private getMessages(errors: any): string[] {
    const messages: string[] = [];

    for (const errorKey of Object.keys(errors)) {
      const customMsg = this.validationMessages[errorKey];
      if (customMsg) {
        messages.push(customMsg);
      } else {
        // Default fallback messages
        switch (errorKey) {
          case 'required':
            messages.push('This field is required.');
            break;
          case 'email':
            messages.push('Invalid email address.');
            break;
          case 'minlength':
            messages.push(`Minimum length is ${errors[errorKey].requiredLength}.`);
            break;
          case 'maxlength':
            messages.push(`Maximum length is ${errors[errorKey].requiredLength}.`);
            break;
          case 'pattern':
            messages.push('Invalid format.');
            break;
          default:
            messages.push(`Invalid: ${errorKey}`);
        }
      }
    }

    return messages;
  }
}
