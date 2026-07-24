import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class FieldValidators {
  static user = {
    required: (customMessage?: string) => {
      const message = customMessage || 'Please select a user';
      return (control: AbstractControl) =>
        Validators.required(control) ? { 'user.required': message } : null;
    }
  };

  static pin = {
    required: (customMessage?: string) => {
      const message = customMessage || 'PIN is required';
      return (control: AbstractControl) =>
        Validators.required(control) ? { 'pin.required': message } : null;
    },
    exactLength: (length: number, customMessage?: string) => {
      const message = customMessage || `PIN must be exactly ${length} digits`;
      return (control: AbstractControl) => {
        if (!control.value) return null;
        return control.value.length === length
          ? null
          : { 'pin.exactLength': message };
      };
    }
  };
}
