import { Entity, ManyToOne } from 'typeorm';
import { Question } from './question.entity';
import { Answer } from './answer.entity';
import { Filter } from './filter.entity';

@Entity()
export class Filter_Add {
    @ManyToOne(type => Question, q => q.filtersAdd, {primary: true})
    question: Question;

    @ManyToOne(type => Answer, a => a.filters, {primary: true})
    answer: Answer;

    @ManyToOne(type => Filter, f => f.filtersAdd)
    filter: Filter;
}
