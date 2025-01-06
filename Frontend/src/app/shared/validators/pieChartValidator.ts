import { FormGroup } from '@angular/forms';

export function pieChartValidator(group: FormGroup) {
    let total = 0;
    for (const key of Object.keys(group.value)) {
        total += +group.value[key];
    }

    return total === 100 ? null : {test2: {valid: false}};
}
