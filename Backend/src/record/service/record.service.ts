import {Injectable} from '@nestjs/common';
import {Connection} from 'typeorm';
import {Record} from '../../models/entities/record.entity';
import {IQuestion} from '../../models/interfaces/question.interface';
import {generateUuid} from '../../shared/uuid/uuid';
import {LanguageService} from '../../shared/language/language.service';
import {QuestionService} from '../../shared/question/question.service';
import {AnswerService} from '../../shared/answer/answer.service';
import {AssessmentService} from '../../shared/assessment/assessment.service';

@Injectable()
export class RecordService {
    constructor(
        private connection: Connection,
        private languageService: LanguageService,
        private questionService: QuestionService,
        private answerService: AnswerService,
        private assessmentService: AssessmentService,
    ) {
    }

    public async getUuid(language: string, assessmentId) {
        while (true) {
            const uuid = generateUuid(5);
            if (await this.getRecordByUuid(uuid) === undefined) {
                const languageId = await this.languageService.getLanguageId(language);
                this.createRecord(uuid, '', new Date(), languageId.id, assessmentId);
                return {uuid};
            }
        }
    }

    public async getRecord(uuid: string) {
        const record = await this.getRecordByUuid(uuid);
        return record === undefined ? undefined : {
            record: JSON.parse(record.results),
            language: await this.languageService.getLanguageName(record.languageId)
        };
    }

    public async postRecord(questions: IQuestion[], uuid: string, language: string, assessmentId: number) {
        const results = JSON.stringify(questions);
        const languageId = await this.languageService.getLanguageId(language);
        return await this.getRecordByUuid(uuid) === undefined ? this.createRecord(uuid, results, new Date(), languageId.id, assessmentId) : this.updateRecord(uuid, results, new Date(), languageId.id, assessmentId);
    }

    private createRecord(uuid: string, results: string, timestamp: Date, languageId, assessmentId) {
        this.connection
            .createQueryBuilder()
            .insert()
            .into(Record)
            .values({
                uuid,
                results,
                timestamp,
                languageId,
                assessmentId,
            })
            .execute();
    }

    private async updateRecord(uuid: string, results: string, timestamp: Date, languageId, assessmentId) {
        if ((await this.assessmentService.getAssessmentByRecord(uuid)) === 1) {
            await this.connection
                .createQueryBuilder()
                .update(Record)
                .set({
                    uuid,
                    results,
                    timestamp,
                    languageId,
                    assessmentId,
                })
                .where('uuid = :uuid', {uuid})
                .execute();
        } else {
            await this.connection
                .createQueryBuilder()
                .update(Record)
                .set({
                    uuid,
                    results,
                    timestamp,
                    languageId,
                })
                .where('uuid = :uuid', {uuid})
                .execute();
        }
    }

    private getRecordByUuid(uuid: string) {
        return this.connection
            .getRepository(Record)
            .createQueryBuilder('record')
            .where('record.uuid = :uuid', {uuid})
            .getOne();
    }

    public async getRecordTranslation(data, language) {
        const languageId = (await this.languageService.getLanguageId(language)).id;
        const result = [];
        const recordLanguageId: number = data.recordLanguage;
        for (const entry of data.data) {
            if (entry.id === 1 || entry.id === 3 || entry.id === 49 || entry.id === 30 || entry.id === 97) {
                result.push({
                    id: entry.id,
                    title: (await this.questionService.getQuestionInformation(entry.id, languageId)).translations[0].title,
                    selectedAnswers: entry.selectedAnswers,
                });
            } else {
                if (entry.selectedAnswers.length > 0) {
                    const answerArray = await this.answerService.getAnswerIdByString(entry.selectedAnswers, entry.id, recordLanguageId);
                    const answerIds = answerArray.map(res => res.id);
                    result.push({
                        id: entry.id,
                        title: (await this.questionService.getQuestionInformation(entry.id, languageId)).translations[0].title,
                        // tslint:disable-next-line:max-line-length
                        selectedAnswers: (await this.answerService.getAnswerTranslations(answerIds, languageId)).map(res => res.translations[0].translation),
                    });
                } else {
                    result.push({
                        id: entry.id,
                        title: (await this.questionService.getQuestionInformation(entry.id, languageId)).translations[0].title,
                        selectedAnswers: [],
                    });
                }
            }
        }
        return result;
    }
}
