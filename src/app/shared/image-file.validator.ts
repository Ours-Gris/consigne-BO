import {AbstractControl} from '@angular/forms';

// custom validator to check type image file
export function imageFile(controlName: string) {
    return (controls: AbstractControl) => {
        const control = controls.get(controlName);

        if (control && control.errors && !control.errors.imageFile) {
            // return if another validator has already found an error
            return;
        }

        // set error on matchingControl if validation fails
        if (control && control.value && (control.value._fileNames.toLowerCase().endsWith('png')
            || control.value._fileNames.toLowerCase().endsWith('jpg')
            || control.value._fileNames.toLowerCase().endsWith('jpeg'))) {
            control.setErrors(null);
        } else {
            if (control && control.value && control.value._fileNames) {
                control.setErrors({imageFile: true});
            }
        }
    }
}
