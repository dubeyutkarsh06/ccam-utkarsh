import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { QuestionSubcomponent } from '../models/question-subcomponent';
import { Validators, FormControl } from '@angular/forms';
import { Answer } from 'src/app/shared/models/answer/answer';

@Component({
    selector: 'app-question-radio',
    templateUrl: './question-radio.component.html',
    styleUrls: ['./question-radio.component.scss']
})
export class QuestionRadioComponent implements OnChanges, QuestionSubcomponent {

    @Input() answers: Answer[];
    @Input() previouslySelectedAnswers: string[];
    @Input() error_text: string[];

    public selectedAnswer: string;
    public radioControl: FormControl;

    constructor() { }

    /**
     * ReInit FormControl
     * Pre-select answer
     * @param changes Component Input
     */
    ngOnChanges(changes: SimpleChanges): void {
        this.radioControl = new FormControl('', Validators.required);
        if (this.previouslySelectedAnswers.length === 0) {
            this.radioControl.setValue('');
        } else {
            this.radioControl.setValue(this.previouslySelectedAnswers[0]);
        }
    }

    /**
     * return selectedAnswer
     * Necessary for QuestionComponent
     */
    public getModel() {
        this.radioControl.markAsTouched();
        return this.radioControl.valid ? [this.radioControl.value] : [];
    }
}
