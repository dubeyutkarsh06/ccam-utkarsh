import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-uuid-dialog',
    templateUrl: './uuid-dialog.component.html',
    styleUrls: ['./uuid-dialog.component.scss']
})
export class UuidDialogComponent {

    constructor(@Inject(MAT_DIALOG_DATA) public data) { }

    public onCopy() {
        this.copyMessage(this.data.uuid);
    }

    private copyMessage(val: string) {
        const selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = val;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
    }
}
