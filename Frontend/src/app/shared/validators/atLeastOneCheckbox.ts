import { FormGroup } from '@angular/forms';

export function atLeastOneCheckbox(formGroup: FormGroup) {
    let checked = false;

    for (const key of Object.keys(formGroup.controls)) {
        if (formGroup.controls[key].value) {
            checked = true;
            break;
        }
    }
    return checked ? null : {test: {valid: true}};
}
