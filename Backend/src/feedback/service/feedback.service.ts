import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Feedback } from '../../models/entities/feedback.entity';
import { CategoryService } from '../../shared/category/category.service';
import { LanguageService } from '../../shared/language/language.service';
import {Startpage} from "../../models/entities/startpage.entity";
import {Feedback_titles} from "../../models/entities/feedback_titles.entity";

@Injectable()
export class FeedbackService {
    constructor(
        private connection: Connection,
        private categoryService: CategoryService,
        private languageService: LanguageService,
    ) { }

    public async getFeedback(scoring, assessmentId: number, language: string) {
        const languageId = (await this.languageService.getLanguageId(language)).id;
        const feedback = {};
        for (const score of Object.keys(scoring)) {
            const categoryId = (await this.categoryService.getScoringCategoryByString(score)).id;
            feedback[score] = await this.createFeedback(categoryId, assessmentId, scoring[score], languageId);
        }
        return feedback;
    }

    private async createFeedback(categoryId: number, assessmentId: number, minScore, languageId: number) {
        const feedback = await this.getFeedbackId(categoryId, assessmentId, minScore.score);
        return {
            feedbackText: {
                text: await this.getFeedText(feedback.id, languageId),
                list: await this.getFeedbackList(feedback.id, languageId)
            },
            gp_title: await this.getTitle(languageId, 'gp_title'),
            goodPractices: await this.getGoodPractices(feedback.id, languageId),
            further_readings_title: await this.getTitle(languageId, 'further_readings_title'),
            recommendations: await this.getRecommendations(feedback.id, languageId),
            tools_title: await this.getTitle(languageId, 'tools_title'),
            tools: await this.getTools(feedback.id, languageId),
            type: (await this.getFeedbackType(feedback.id)).type,
        };
    }

    private getFeedbackId(categoryId: number, assessmentId: number, minScore: number) {
        const q = this.connection
        .getRepository(Feedback)
        .createQueryBuilder('feedback')
        .leftJoin('feedback.assessmentFeedback', 'af')
        .leftJoin('af.assessment', 'assessment')
        .leftJoin('af.category', 'category')
        .where('assessment.id = :assessmentId', {assessmentId})
        .andWhere('category.id = :categoryId', {categoryId})
        .andWhere('af.minScore <= :minScore', {minScore})
        .orderBy('af.minScore', 'DESC')
        console.log(q.getSql());
        return q
            .getOne();
    }

    private getFeedbackType(feedbackId: number) {
        return this.connection
            .getRepository(Feedback)
            .createQueryBuilder('feedback')
            .where('feedback.id = :feedbackId', {feedbackId})
            .getOne();
    }

    private async getFeedText(feedbackId: number, languageId: number) {
        const feedback = await this.connection
            .getRepository(Feedback)
            .createQueryBuilder('feedback')
            .leftJoinAndSelect('feedback.feedbackIntro', 'feedIntro')
            .leftJoinAndSelect('feedIntro.translations', 'translations')
            .leftJoinAndSelect('translations.translatableStrings', 'ts')
            .where('feedback.id = :feedbackId', {feedbackId})
            .andWhere('ts.language = :languageId', {languageId})
            .select('ts.value as string')
            .getRawMany();

        return feedback.map(p => p.string);
    }

    private async getFeedbackList(feedbackId: number, languageId: number) {
        const feedback = await this.connection
            .getRepository(Feedback)
            .createQueryBuilder('feedback')
            .leftJoinAndSelect('feedback.feedbackIntro', 'feedIntro')
            .leftJoinAndSelect('feedIntro.lists', 'lists')
            .leftJoinAndSelect('lists.translatableStrings', 'ts')
            .where('feedback.id = :feedbackId', {feedbackId})
            .andWhere('ts.language = :languageId', {languageId})
            .select('ts.value as string')
            .getRawMany();
        return feedback.map(p => p.string);
    }

    private async getGoodPractices(feedbackId: number, languageId: number) {
        const feedback = await this.connection
            .getRepository(Feedback)
            .createQueryBuilder('feedback')
            .leftJoinAndSelect('feedback.goodPractices', 'gp')
            .leftJoinAndSelect('gp.translatableStrings', 'ts')
            .where('feedback.id = :feedbackId', {feedbackId})
            .andWhere('ts.language = :languageId', {languageId})
            .select('ts.value as text')
            .addSelect('ts.url as url')
            .getRawMany();

        return feedback.map(p => {
            return {text: p.text, url: p.url}
        });
    }

    private async getRecommendations(feedbackId: number, languageId: number) {
        const feedback = await this.connection
            .getRepository(Feedback)
            .createQueryBuilder('feedback')
            .leftJoinAndSelect('feedback.recommnedations', 'rec')
            .leftJoinAndSelect('rec.translatableStrings', 'ts')
            .where('feedback.id = :feedbackId', {feedbackId})
            .andWhere('ts.language = :languageId', {languageId})
            .select('ts.value as text')
            .addSelect('ts.url as url')
            .getRawMany();

        return feedback.map(p => {
            return {text: p.text, url: p.url}
        });
    }

    private async getTools(feedbackId: number, languageId: number) {
        const feedback = await this.connection
            .getRepository(Feedback)
            .createQueryBuilder('feedback')
            .leftJoinAndSelect('feedback.tools', 'tools')
            .leftJoinAndSelect('tools.translatableStrings', 'ts')
            .where('feedback.id = :feedbackId', {feedbackId})
            .andWhere('ts.language = :languageId', {languageId})
            .select('ts.value as string')
            .addSelect('ts.url as url')
            .getRawMany();

        return feedback.map(p => {
            return {
                text: p.string,
                url: p.url,
            }
        });
    }

    private async getTitle(languageId: number, param: string) {
        const res = await this.connection
            .getRepository(Feedback_titles)
            .createQueryBuilder('fbt')
            .leftJoinAndSelect('fbt.translations', 'translation')
            .leftJoinAndSelect('translation.translatableStrings', 'tts')
            .where('tts.language = :languageId', {languageId: languageId})
            .andWhere('fbt.marker = :param', {param: param})
            .select('tts.value as string')
            .getRawMany();
        return res.map(t => t.string);
    }
}
