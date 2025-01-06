import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Question } from '../../models/entities/question.entity';
import { IQuestion } from '../../models/interfaces/question.interface';
import {question_component_translation} from '../../models/entities/question_component_translation.entity';

@Injectable()
export class QuestionService {
    constructor(
        private connection: Connection,
    ) { }

    public getAssessment(questionId: number) {
        return this.connection
            .getRepository(Question)
            .createQueryBuilder('question')
            .leftJoinAndSelect('question.questionAssessmentsAssessment', 'qsa')
            .leftJoinAndSelect('qsa.assessmentType', 'at')
            .where('question.id = :questionId', { questionId })
            .getMany();
    }

    public async getQuestionCountPerCategory(questions: IQuestion[]) {
        const questionIds = questions.map(q => q.id);

        return this.connection
            .getRepository(Question)
            .createQueryBuilder('question')
            .leftJoinAndSelect('question.category', 'category')
            .where('question.id IN (:questionIds)', { questionIds })
            .groupBy('category.id')
            .select(['count(question.id) AS questions, category.id AS category'])
            .getRawMany();
    }

    public getQuestionScoringInformation(questionId: number) {
        return this.connection
            .getRepository(Question)
            .createQueryBuilder('question')
            .leftJoinAndSelect('question.scoringType', 'scoringType')
            .leftJoinAndSelect('question.category', 'category')
            .where('question.id = :questionId', { questionId })
            .getOne();
    }

    public getActiveQuestions(sectionId: number, assessmentId: number) {
        return this.connection
            .getRepository(Question)
            .createQueryBuilder('question')
            .leftJoin('question.sections', 'sections')
            .leftJoin('question.questionAssessmentsAssessment', 'qsa')
            .where('sections.id IN (:sec)', { sec: [sectionId] })
            .andWhere('qsa.assessmentType IN (:assessmentId)', { assessmentId })
            .orderBy('qsa.order', 'ASC')
            .getMany();
    }

    public getSectionQuestions(sectionId: number) {
        return this.connection
            .getRepository(Question)
            .createQueryBuilder('question')
            .leftJoin('question.sections', 'sections')
            .where('sections.id = sectionId', { sectionId })
            .getMany();
    }

    public getQuestionInformation(questionId: number, languageId: number) {
        return this.connection
            .getRepository(Question)
            .createQueryBuilder('question')
            .leftJoinAndSelect('question.type', 'type')
            .leftJoinAndSelect('question.filters', 'filters')
            .leftJoinAndSelect('question.translations', 'translations')
            .where('question.id = :questionId', { questionId })
            .andWhere('translations.language = :languageId', { languageId })
            .getOne();
    }

    public async getQuestionComponentData(languageId: number, param: string) {
        const res = await this.connection
            .getRepository(question_component_translation)
            .createQueryBuilder('qct')
            .leftJoinAndSelect('qct.translations', 'translation')
            .leftJoinAndSelect('translation.translatableStrings', 'tts')
            .where('tts.language = :languageId', {languageId: languageId})
            .andWhere('qct.marker = :param', {param: param})
            .select('tts.value as string')
            .getRawMany();
        return res.map(t => t.string);
    }

}
