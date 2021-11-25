import {Injectable, isDevMode} from '@angular/core';
import {ErrorCodeEnum} from "../../enums/error-code.enum";
import {AbstractControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ValidationErrorService {

  public getValidationErrorMessage(control: AbstractControl): string | null {
    if (!control.errors) {
      return null;
    }

    if (control.hasError(ErrorCodeEnum.serverError)) {
      return control.getError(ErrorCodeEnum.serverError);
    }

    if (control.hasError(ErrorCodeEnum.required)) {
      return 'Required field';
    }

    if (control.hasError(ErrorCodeEnum.email)) {
      return 'The field must contain a valid email address';
    }

    if (control.hasError(ErrorCodeEnum.minLength)) {
      const error = control.getError(ErrorCodeEnum.minLength);
      return `The field must contain at least digits`;
    }

    if (control.hasError(ErrorCodeEnum.maxLength)) {
      const error = control.getError(ErrorCodeEnum.maxLength);
      return `The field must contain no more than  digits`;
    }

    if (control.hasError(ErrorCodeEnum.min)) {
      const error = control.getError(ErrorCodeEnum.min);
      return `Minimum allowed value `;
    }

    if (control.hasError(ErrorCodeEnum.max)) {
      const error = control.getError(ErrorCodeEnum.max);
      return `Maximum allowed value `;
    }

    if (isDevMode()) {
      console.warn('Unknown validation error', control.errors);
    }

    return null;
  }
}
