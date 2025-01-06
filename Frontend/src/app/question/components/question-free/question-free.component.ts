import { Component, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { QuestionSubcomponent } from '../models/question-subcomponent';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { pieChartValidator } from '../../../shared/validators/pieChartValidator';
import { Answer } from 'src/app/shared/models/answer/answer';

@Component({
    selector: 'app-question-free',
    templateUrl: './question-free.component.html',
    styleUrls: ['./question-free.component.scss']
})
export class QuestionFreeComponent implements OnChanges, QuestionSubcomponent {

    @Input() answers: Answer[];
    @Input() type: string;
    @Input() previouslySelectedAnswers: string[];
    @Input() isNotLastQuestion: boolean;
    @Input() remaining_text: string[];
    @Input() free_label: string;
    @ViewChild(PieChartComponent) pieChartComponent: PieChartComponent;

    public formGroup: FormGroup;

    public backgroundColors = ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'];

    constructor() { }

    /**
     * ReInit FormGroup
     * Pre-select answers
     * @param changes Input arguments
     */
    ngOnChanges(changes: SimpleChanges): void {
        this.initForm();
        if (this.previouslySelectedAnswers.length === 0) {
            for (const control of Object.keys(this.formGroup.controls)) {
                this.formGroup.controls[control].setValue(null);
            }
        } else {
            for (let i = 0; i < this.answers.length; i++) {
                this.formGroup.controls[i].setValue(this.previouslySelectedAnswers[i]);
            }
        }
    }

    /**
     * ReInit FormGroup
     */
    private initForm() {
        this.formGroup = new FormGroup({});

        for (let i = 0; i < this.answers.length; i++) {
            const control = new FormControl('', Validators.required);
            this.formGroup.addControl(i.toString(), control);
        }

        if (this.type === 'text+pie') {
            this.formGroup.setValidators(pieChartValidator);
        }
    }

    /**
     * Update Chart with new data
     */
    public updateChart() {
        this.pieChartComponent.updateChart(this.getSelected().map(Number));
    }

    /**
     * Check whether the Form is valid
     */
    private formValid() {
        if (!this.formGroup.valid) {
            for (const control of Object.keys(this.formGroup.value)) {
                this.formGroup.controls[control].markAsTouched();
                this.formGroup.controls[control].setErrors({incorrect: true});
            }
        }
        return this.formGroup.valid;
    }

    /**
     * Return selected answers
     */
    private getSelected() {
        const tmp = [];
        for (const control of Object.keys(this.formGroup.controls)) {
            tmp.push(this.formGroup.controls[control].value);
        }
        return tmp;
    }

    /**
     * Return sum of all inputs
     * Helper method for ChartComponents
     */
    public getFormSum() {
        return this.getSelected().reduce((a, b) => a + b);
    }

    /**
     * return selectedAnswer
     * Necessary for QuestionComponent
     */
    public getModel() {
        return this.formValid() ? this.getSelected() : [];
    }
}
