import { Injectable } from '@angular/core';
import { QuestionService } from '../question/question.service';
import { Question } from 'src/app/shared/models/question/question';

@Injectable({
    providedIn: 'root'
})
export class ProgressbarService {

    constructor(
        private questionService: QuestionService,
    ) { }

    public getProgressBarPartial(questions: Question[] = this.questionService.getQuestions(),
                                 index = this.questionService.getQuestionIndex()): number {

        return (index + 1) / questions.length * 100;
    }
}
