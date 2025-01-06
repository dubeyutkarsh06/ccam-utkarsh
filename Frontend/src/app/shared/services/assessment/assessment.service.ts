import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AssessmentService {

    private assessment = 0;

    constructor() { }

    public setAssessment(assessmentId: number) {
        this.assessment = assessmentId;
    }

    public getAssessment() {
        return this.assessment;
    }
}
