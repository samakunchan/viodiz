# Confirm password validator

## Configuration

    # register/confirm-password.validator.ts

    import { AbstractControl } from '@angular/forms';

    export class ConfirmPasswordValidator {
      static MatchPassword(control: AbstractControl) {
        const password = control.get('password').value;
        const confirmPassword = control.get('confirmPassword').value;
        if (password !== confirmPassword) {
          control.get('confirmPassword').setErrors({ ConfirmPassword: true });
        } else {
          return null;
        }
      }
    }

Il va comparer le `password` et le `confirmPassword` de façon dynamique lettre par lettre.

## Component

Au moment d'initialiser le formulaire.

    #register/register.component.ts

    import { ConfirmPasswordValidator } from './confirm-password.validator';
    ...
    ...


    initForm() {
      this.lambdaForm = this.formbuilder.group(
        {
          ...
          ...
          password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
          confirmPassword: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
          ...
        },
        {
          validator: ConfirmPasswordValidator.MatchPassword,
        },
      );
    }
