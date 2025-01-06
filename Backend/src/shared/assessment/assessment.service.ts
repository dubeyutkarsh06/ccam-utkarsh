import {Injectable} from '@nestjs/common';
import {Connection} from 'typeorm';
import {Forwarding} from '../../models/entities/forwarding.entity';
import {AssessmentFinish} from '../../models/entities/assessmentFinish.entity';
import {Startpage} from '../../models/entities/startpage.entity';
import {Resultpage} from '../../models/entities/result_page.entity';
import {Record} from '../../models/entities/record.entity';

@Injectable()
export class AssessmentService {
    constructor(private readonly connection: Connection) {
    }

    public async getAssessmnet(filters: number[], assessmentId: number) {
        const forwarding = (await this.getAssessmentType(filters)).sort((a, b) => b.filters.length - a.filters.length);
        return forwarding[0].assessmentType.id !== assessmentId ? forwarding[0].assessmentType.id : null;
    }

    public async getAssessmentByRecord(uuid: string) {
        const res = await this.getAssessmentIdByRecord(uuid);
        return res.assessmentId;
    }

    public async getAssessmentFinish(assessmentId: number, languageId: number) {
        const assessmentFinishId: number = await this.getAssessmentFinishID(assessmentId);
        return {
            title: await this.getFinish(languageId, 'title', assessmentFinishId),
            subtitle: await this.getFinish(languageId, 'subtitle', assessmentFinishId),
            explanation: await this.getFinish(languageId, 'explanation', assessmentFinishId),
            comparison_code: await this.getFinish(languageId, 'comparison-code', assessmentFinishId),
            chart_legend: await this.getFinish(languageId, 'chart-legend', assessmentFinishId),
            rating_text: await this.getFinish(languageId, 'rating-text', assessmentFinishId),
            feedback_title: await this.getFinish(languageId, 'feedback-title', assessmentFinishId),
            feedback_explanation: await this.getFinish(languageId, 'feedback-explanation', assessmentFinishId),
            q_table_title: await this.getFinish(languageId, 'q-table-title', assessmentFinishId),
            finish_text: await this.getFinish(languageId, 'finish-text', assessmentFinishId),
            finish_links: await this.getFinish(languageId, 'finish-links', assessmentFinishId),
            button_text: await this.getFinish(languageId, 'button-text', assessmentFinishId),
            wrongCodeError: await this.getFinish(languageId, 'invalid_code', assessmentFinishId),
            csv_export_button: await this.getFinish(languageId, 'csv_export_button', assessmentFinishId)
        };
    }

    private getAssessmentType(filter: number[]) {
        return this.connection
            .getRepository(Forwarding)
            .createQueryBuilder('forwarding')
            .leftJoinAndSelect('forwarding.assessmentType', 'assessmentType')
            .leftJoinAndSelect('forwarding.filters', 'filters')
            .where('filters.id IN (:filter)', {filter})
            .getMany();
    }

    private async getFinish(languageId: number, param: string, assessmentId: number) {
        if (param === 'finish-links') {
            const res = await this.connection
                .getRepository(Resultpage)
                .createQueryBuilder('rp')
                .leftJoinAndSelect('rp.translations', 'translation')
                .leftJoinAndSelect('translation.translatableStrings', 'tts')
                .where('tts.language = :languageId', {languageId})
                .andWhere('rp.marker = :param', {param})
                .andWhere('rp.assessmentFinishId = :assessmentId', {assessmentId})
                .select('tts.value as string')
                .addSelect('tts.url as url')
                .getRawMany();
            return res.map(p => {
                return {text: p.string, url: p.url};
            });
        }
        const res = await this.connection
            .getRepository(Resultpage)
            .createQueryBuilder('rp')
            .leftJoinAndSelect('rp.translations', 'translation')
            .leftJoinAndSelect('translation.translatableStrings', 'tts')
            .where('tts.language = :languageId', {languageId})
            .andWhere('rp.marker = :param', {param})
            .andWhere('rp.assessmentFinishId = :assessmentId', {assessmentId})
            .select('tts.value as string')
            .getRawMany();
        return res.map(t => t.string);
    }
    private async getAssessmentFinishID(assessmentId: number) {
        const res = await this.connection
            .getRepository(AssessmentFinish)
            .createQueryBuilder('af')
            .where('af.assessment = :assessmentId', {assessmentId})
            .select('af.id')
            .getOne();
        return res.id;
    }

    private async getAssessmentIdByRecord(uuid: string) {
        return await this.connection
            .getRepository(Record)
            .createQueryBuilder('r')
            .where('r.uuid = :uuid', {uuid: uuid})
            .select('r.assessmentId')
            .getOne();
    }
}
