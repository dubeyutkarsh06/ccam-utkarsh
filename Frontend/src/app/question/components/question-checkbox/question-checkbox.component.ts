import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { QuestionSubcomponent } from '../models/question-subcomponent';
import { FormGroup, FormControl } from '@angular/forms';
import { atLeastOneCheckbox } from '../../../shared/validators/atLeastOneCheckbox';
import { Answer } from 'src/app/shared/models/answer/answer';

@Component({
    selector: 'app-question-checkbox',
    templateUrl: './question-checkbox.component.html',
    styleUrls: ['./question-checkbox.component.scss']
})
export class QuestionCheckboxComponent implements OnChanges, QuestionSubcomponent {

    @Input() previouslySelectedAnswers: string[];
    @Input() error_text: string[];
    @Input() answers: Answer[];

    public formGroup: FormGroup;

    constructor() { }

    /**
     * ReInit FormGroup
     * Pre-select answer
     * @param changes Input arguments
     */
    ngOnChanges(changes: SimpleChanges): void {
        this.initForm();
        if (this.previouslySelectedAnswers.length === 0) {
            for (const control of Object.keys(this.formGroup.controls)) {
                this.formGroup.controls[control].setValue(false);
            }
        } else {
            for (const answer of this.previouslySelectedAnswers) {
                const answers = this.answers.map(a => a.translation);
                const index = answers.indexOf(answer);
                if (index !== -1) {
                    this.formGroup.controls[index].setValue(true);
                }
            }
        }
    }

    /**
     * ReInit FormGroup
     */
    private initForm() {
        this.formGroup = new FormGroup({}, atLeastOneCheckbox);
        for (let i = 0; i < this.answers.length; i++) {
            const control = new FormControl('');
            this.formGroup.addControl(i.toString(), control);
        }
    }

    /**
     * Return selected answers
     */
    private getCheckedAnswers() {
        const answers = [];

        for (let i = 0; i < this.answers.length; i++) {
            if (this.formGroup.controls[i].value) {
                answers.push(this.answers[i].translation);
            }
        }
        return answers;
    }

    /**
     * Check whehter the answer is an exclusive answer
     * True: select answer, deselect everything else
     * False: select answer
     * @param answer Selected answer
     */
    public exclusiveChecked(answer: Answer) {
        if (answer.type === 1) {
            for (const control of Object.keys(this.formGroup.controls)) {
                if (answer.translation !== this.formGroup.controls[control].value) {
                    this.formGroup.controls[control].setValue(false);
                }
            }
        } else {
            for (let i = 0; i < this.answers.length; i++) {
                if (this.answers[i].type === 1 && this.formGroup.controls[i].value === true) {
                    this.formGroup.controls[i].setValue(false);
                }
            }
        }
    }

    /**
     * return selectedAnswer
     * Necessary for QuestionComponent
     */
    public getModel() {
        this.formGroup.markAsTouched();
        return this.formGroup.valid ? this.getCheckedAnswers() : [];
    }
}
