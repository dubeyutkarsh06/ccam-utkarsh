import { Injectable } from '@nestjs/common';
import { IQuestion } from '../../../models/interfaces/question.interface';

@Injectable()
export class FilterService {
    public getFilter(questions: IQuestion[]) {
        const filters = [];
        for (const question of questions) {
            for (const item in question.filterAdd) {
                if (question.selectedAnswers.includes(item)) {
                    filters.push(question.filterAdd[item]);
                }
            }
        }
        return filters;
    }
}
