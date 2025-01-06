import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { QuestionSubcomponent } from '../models/question-subcomponent';
import { Validators, FormControl } from '@angular/forms';
import { Answer } from '../../../shared/models/answer/answer';

@Component({
    selector: 'app-question-dropdown',
    templateUrl: './question-dropdown.component.html',
    styleUrls: ['./question-dropdown.component.scss']
})
export class QuestionDropdownComponent implements OnChanges, QuestionSubcomponent {


    @Input() previouslySelectedAnswers: string[];
    @Input() error_text: string[];
    @Input() select_text: string[];
    @Input() answers: Answer[];

    public dropdown: FormControl;

    constructor() { }

    /**
     * ReInit FormControl
     * Pre-select answer
     * @param changes Input arguments
     */
    ngOnChanges(changes: SimpleChanges): void {
        this.dropdown = new FormControl('', Validators.required);
        if (this.previouslySelectedAnswers.length === 0) {
            this.dropdown.setValue('');
        } else {
            this.dropdown.setValue(this.previouslySelectedAnswers[0]);
        }
    }

    /**
     * return selectedAnswer
     * Necessary for QuestionComponent
     */
    public getModel(): string[] {
        this.dropdown.markAsTouched();
        return this.dropdown.valid ? [this.dropdown.value] : [];
    }
}
