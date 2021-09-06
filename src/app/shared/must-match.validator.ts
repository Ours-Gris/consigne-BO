import {AbstractControl} from '@angular/forms';

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
    return (controls: AbstractControl) => {
        const control = controls.get(controlName);
        const matchingControl = controls.get(matchingControlName);

        if (matchingControl && matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control && matchingControl && control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            if (matchingControl) {
                matchingControl.setErrors(null);
            }
        }
    }
}
