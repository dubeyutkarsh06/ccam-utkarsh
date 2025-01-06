import {
    CACHE_MANAGER,
    CacheModule,
    Inject,
    Injectable,
    InternalServerErrorException,
    ServiceUnavailableException,
} from '@nestjs/common';
import { ExportData } from '../../models/interfaces/exportData.interface';
import { ExportService } from '../../shared/export/export.service';
import { NavigationService } from '../../navigation/service/navigation.service';
import { ScoringService } from '../../scoring/service/scoring.service';
import { LanguageService } from '../../shared/language/language.service';
import { createObjectCsvStringifier as createCsvWriter } from 'csv-writer';
import { AnswerService } from '../../shared/answer/answer.service';
import MemoryStore from 'cache-manager-memory-store';
import { RecordService } from '../../record/service/record.service';
import { X_OK } from 'constants';

const cacheManager = require('cache-manager');
import * as XLSX from 'xlsx';
import { fstat, fstatSync, fsync, writeFileSync } from 'fs';
const cache = cacheManager.caching({ store: MemoryStore });
const fs = require('fs');

@Injectable()
export class StatisticService {
    JOB_QUEUE = {};

    constructor(
        private exportService: ExportService,
        private navigationService: NavigationService,
        private scoringService: ScoringService,
        private languageService: LanguageService,
        private answerService: AnswerService,
        private recordService: RecordService,
    ) {
    }

    replaceAll = (str: string, find: string, replace: string) => str.replace(new RegExp(find, 'g'), replace);

    fmt = (d: Date) => d ? this.replaceAll(new Date(d).toLocaleDateString(), '/', '_') : this.replaceAll(new Date().toLocaleDateString(), '/', '_');


    public async exportDataInBackground(input: ExportData, job_id: string) {

        let records = await this.processExportData(input, job_id);

        console.time('Excel Mapping')
        let mapped_filtered_result: any[][] = this.mapRecordsForExcelExport(records[0]);
        let mapped_test_result: any[][] = this.mapRecordsForExcelExport(records[1]);
        console.timeEnd('Excel Mapping')

        // make excel file
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        wb.Props = {};

        const dateString = `${input.fromDatePicker ? this.fmt(input.fromDatePicker) : ''}-${input.toDatePicker == null ? this.fmt(input.toDatePicker) : ''}`;

        wb.Props.Title = `SUMP_Data_${input.fromDatePicker == null && input.toDatePicker == null ? this.fmt(null) : dateString}`;

        console.time('Array to XLS')
        const ws = XLSX.utils.aoa_to_sheet(mapped_filtered_result);
        const ws2 = XLSX.utils.aoa_to_sheet(mapped_test_result);
        XLSX.utils.book_append_sheet(wb, ws, 'filtered_data');
        XLSX.utils.book_append_sheet(wb, ws2, 'test_data');
        this.JOB_QUEUE[job_id].file_buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

        console.timeEnd('Array to XLS');
        this.JOB_QUEUE[job_id].progress = 100;
    }


    public mapRecordsForExcelExport(records: any[]) {
        const result = [];
        const keys = records[0].map(i => i.id.toString()) // are objects of form {id: , title: }
        const columns = keys.length; // num of columns
        const header = records[0].map(i => i.title) // header of excel file

        result.push(header); // add header
        for (let i = 1; i < records.length; i++) { // for every record
            const row = Array(columns); // make empty row
            const curr = records[i]; // a record with q and a 
            for (let j = 0; j < columns; j++) {
                const q_id = keys[j].toString();
                if (curr[q_id]) {
                    if (Array.isArray(curr[q_id]))
                        curr[q_id] = curr[q_id][0];

                    row[j] = curr[q_id] ? curr[q_id] : '';
                }
            }
            result.push(row);
        }

        return result;
    }


    public exportData = (input: ExportData) => {
        console.log(`Input Received:`, input);

        const job_id = new Date().getTime().toString(36);
        this.JOB_QUEUE[job_id] = { progress: 0 };

        this.exportDataInBackground(input, job_id);

        return job_id;
    }

    public async processExportData(input: ExportData, job_id: string) {
        console.log(`Started Exporting Data for job # ${job_id}`);
        // set the Filter for the assessment
        const assessmentFilter: number[] = this.setAssessmentFilter(input.assessment);
        const minimumScoreFilter: boolean = input.minimumScore < 7;
        const processActivePersonsFilter: boolean = input.processActivePersons;

        const exportLanguage: string = input.language;
        console.time('getLanguageId');
        const exportLanguageId: number = (await this.languageService.getLanguageId(exportLanguage)).id;
        console.timeEnd('getLanguageId');

        // fetches all records from time to time
        let records = [];
        const fetch_all = input.fromDatePicker === null && input.toDatePicker === null;
        const fetch_all_from = input.fromDatePicker !== null && input.toDatePicker === null;
        const fetch_all_to = input.fromDatePicker === null && input.toDatePicker !== null;

        console.time('getRecords');
        if (fetch_all) {
            records = await this.exportService.getAllRecords(assessmentFilter);
        } else if (fetch_all_from) {
            input.fromDatePicker = new Date(input.fromDatePicker);
            const fromDate = StatisticService.formatDates(input.fromDatePicker);
            records = await this.exportService.getRecordsFromDate(fromDate, assessmentFilter);
        } else if (fetch_all_to) {
            input.toDatePicker = new Date(input.toDatePicker);
            const toDate = StatisticService.formatDates(input.toDatePicker);
            records = await this.exportService.getRecordsToDate(toDate, assessmentFilter);
        } else {
            input.fromDatePicker = new Date(input.fromDatePicker);
            input.toDatePicker = new Date(input.toDatePicker);
            const fromDate = StatisticService.formatDates(input.fromDatePicker);
            const toDate = StatisticService.formatDates(input.toDatePicker);
            records = await this.exportService.getRecordsBetweenDates(fromDate, toDate, assessmentFilter);
        }
        console.timeEnd('getRecords');


        let countryFilter = input.countries.length > 0;
        console.time('getCountriesInAllLanguages');
        let countries = countryFilter ? await this.getCountriesInAllLanguages(input.countries) : [];
        console.timeEnd('getCountriesInAllLanguages');

        // checks if the population filter is needed and set it to true if needed
        let populationFilter = input.population.length > 0;

        // fetches all questions
        console.time('getQuestionArray');
        const allQuestions = await this.getQuestionArray(exportLanguageId);
        console.timeEnd('getQuestionArray');

        // sets the titles for the columns of the xls file
        console.time('getGeneralEntryInfoTranslation');
        let header = this.getGeneralEntryInfoTranslation(exportLanguageId);
        console.timeEnd('getGeneralEntryInfoTranslation');

        // add dynamic titles for the different categories
        console.time('getCategories');
        const categoriesObject = await this.getCategories(exportLanguageId);
        const categories = categoriesObject.title;
        const categoriesKeys = categoriesObject.key;
        const categoriesIds = categoriesObject.id;
        for (let i = 0; i < categoriesKeys.length; i++) {
            header.push({ id: categoriesKeys[i], title: categories[i] });
        }
        console.timeEnd('getCategories');

        // adds the questions to the header
        header = header.concat(allQuestions);


        const filtered_records = [];
        const test_records = [];
        filtered_records.push(header);
        test_records.push(header);

        console.time('ExportLoop');
        
        loop1: for (let i = 0; i < records.length; i++) {
            
            this.JOB_QUEUE[job_id].progress = Math.trunc((i * 100) / records.length);

            const entry = records[i];
            if (entry.results.length === 0 || !assessmentFilter.includes(entry.assessmentId)) {
                continue;
            }
            const tmp = {};
            // save general information of an entry
            let test_entry = false;
            const code = { id: 'user_code', value: entry.uuid };
            const timestamp = { id: 'timestamp', value: entry.timestamp };
            const lang = await this.languageService.getLanguageName(entry.languageId);
            const language = { id: 'language', value: lang.name };
            const questions = JSON.parse(entry.results);
            const name = { id: 'name', value: '', test: false };
            const email = { id: 'email', value: '', test: false };
            const impression = { id: 'impression', value: '', test: false };
            const country = { id: 'country', value: '', test: false };
            const city = { id: 'city', value: '', test: false };
            const qAnswer = [];
            const questionTranslations = await this.recordService.getRecordTranslation({ data: questions, recordLanguage: entry.languageId }, exportLanguage);
            
            let containsQ7 = false;

            const answer_is_test = (qAnswer: string) => qAnswer && qAnswer.toLowerCase().includes('test');  

            loop2: for (let j = 0; j < questionTranslations.length; j++) {
                const qEntry = questionTranslations[j];
                qAnswer.push({ id: qEntry.id, value: qEntry.selectedAnswers });

                // filters the dataset with the given filters. Filters are bound to specific questions (e.g. country filter -> question 2: from which country are you doing the assessment)
                switch (qEntry.id) {
                    case 2:
                        country.value = qEntry.selectedAnswers[0];
                        if (countryFilter) {
                            if (countries.includes(country.value)) {
                                break;
                            }
                            continue loop1;
                        }
                        break;
                    case 1:
                        if (input.dataContainsTestFilter && answer_is_test(qEntry.selectedAnswers[0])) { city.test = true; test_entry = true; }
                        city.value = qEntry.selectedAnswers[0];
                        break;
                    case 3:
                        if (input.dataContainsTestFilter && answer_is_test(qEntry.selectedAnswers[0]))
                            test_entry = true;
                        break;
                    case 4:
                        if (!input.population.includes(qEntry.selectedAnswers[0]) && populationFilter) {
                            continue loop1;
                        }
                        break;
                    case 7:
                        containsQ7 = true;
                        if (processActivePersonsFilter && (!qEntry.selectedAnswers[0] || (await this.getAnswerId(qEntry.selectedAnswers, qEntry.id, exportLanguageId)) === 21)) {
                            continue loop1;
                        }
                        break;
                    case 49:
                        if (input.dataContainsTestFilter &&
                            (answer_is_test(qEntry.selectedAnswers[0]) || answer_is_test(qEntry.selectedAnswers[1]) || answer_is_test(qEntry.selectedAnswers[2]))
                        ) { impression.test = true; name.test = true, email.test = true; test_entry = true; }
                        impression.value = qEntry.selectedAnswers[0];
                        name.value = qEntry.selectedAnswers[1];
                        email.value = qEntry.selectedAnswers[2];
                        break;
                    default:
                        break;
                }
            }
            if (processActivePersonsFilter && !containsQ7) continue;
            // if the entry is valid, adds all the informations to an temporary array
            let id = code.id;
            tmp[id] = code.value;
            id = timestamp.id;
            tmp[id] = timestamp.value;
            id = language.id;
            tmp[id] = language.value;
            id = name.id;
            tmp[id] = name.value;
            id = email.id;
            tmp[id] = email.value;
            id = impression.id;
            tmp[id] = impression.value;
            id = country.id;
            tmp[id] = country.value;
            id = city.id;
            tmp[id] = city.value;
            // fetches the scoring for the questions
            const scoring = await this.scoringService.getScoring(questions, lang.name, entry.assessmentId);
            const scoringKeys = Object.keys(scoring);
            let categoryIDs;
            let categoryTitle;
            if (scoringKeys.length === 0) {
                categoryIDs = [];
                categoryTitle = [];
            } else {
                const categoryArr = await this.getCategoryIDs(scoringKeys);
                categoryIDs = categoryArr.id;
                categoryTitle = categoryArr.title;
            }
            let filtered_valueSum = 0;
            let test_valueSum = 0;
            let counter = 0;
            const scoreTmp = [];
            let categoryIdCounter = 0;
            // calculates the scoring for every category of the self-assessment
            let categoryCounter = 0;
            for (let k = 0; k < categoriesIds.length; k++) {
                // if there is a score for the given category set the score otherwise set the score to 0
                if (categoryIDs.includes(categoriesIds[k])) {
                    const maxScore = scoring[categoryTitle[categoryIdCounter]].maxScore;
                    const score = scoring[categoryTitle[categoryIdCounter]].score;
                    counter += 1;
                    categoryIdCounter += 1;
                    const factor = 100 / maxScore;
                    const value = score * factor > 100 ? 100 : score * factor;
                    if (input.dataContainsTestFilter && test_entry)
                        test_valueSum += value;
                    else filtered_valueSum += value;
                    tmp[categoriesKeys[k]] = Math.round((value));
                } else {
                    counter += 1;
                    categoryCounter += 1;
                    tmp[categoriesKeys[k]] = 0;
                    if (minimumScoreFilter && !(categoryCounter <= input.minimumScore)) {
                        continue loop1;
                    }
                }
            }
            tmp['average_score'] = (input.dataContainsTestFilter && test_entry) ? Math.round(test_valueSum / 7) : Math.round(filtered_valueSum / 7);
            // adds the questions and the selected answer to the temporary array
            for (let a = 0; a < qAnswer.length; a++) {
                tmp[qAnswer[a].id] = qAnswer[a].value;
            }
            // adds the temporary array to the result array that is given to the convert to csv string function
            if (input.dataContainsTestFilter && test_entry)
                test_records.push(tmp)
            else filtered_records.push(tmp);

        }
        
        console.timeEnd('ExportLoop');
        
        return [filtered_records, test_records];
    }


    public reportExportProgress = (job_id: string): number => {
        
        return this.JOB_QUEUE[job_id] ? this.JOB_QUEUE[job_id].progress : 0;
    }


    public getExportedFile = (job_id: string) => {
        const workbook = this.JOB_QUEUE[job_id].file_buffer;
        delete this.JOB_QUEUE[job_id] // remove this job from queue

        return workbook;
    }


    /**
     * bring the date into the required form
     * @param date
     */
    private static formatDates(date: Date) {
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth() + 1;
        const day = date.getUTCDate();

        // tslint:disable-next-line:max-line-length
        return StatisticService.formatZerolessValue(year) + '-' + StatisticService.formatZerolessValue(month) + '-' + StatisticService.formatZerolessValue(day);
    }

    /**
     * adds a 0 to number values that are smaller then 10
     * @param value
     */
    private static formatZerolessValue(value: number): string {
        if (value < 10) {
            return '0' + value;
        }

        return String(value);
    }

    /**
     * returns array as header for the CSV File
     */
    private async getCategories(langId) {
        const categories = await this.exportService.getScoringCategory(langId);
        const key = [];
        const title = [];
        const id = [];
        for (let i = 0; i < categories.length; i++) {
            const category = categories[i].value.toLowerCase();
            const resultCategory = category.replace(/ /g, '_');
            key.push(resultCategory);
            title.push(categories[i].value);
            id.push(categories[i].id);
        }
        return { id, title, key };
    }

    /**
     * converts an n x m array matrix into a csv string
     * @param data
     */
    private async getCSVString(data) {
        const csvWriter = createCsvWriter({ header: data[0], fieldDelimiter: ';' });
        const records = [];
        for (let i = 1; i < data.length; i++) {
            records.push(data[i]);
        }
        const string = csvWriter.getHeaderString() + csvWriter.stringifyRecords(records);
        return { csvString: string };
    }

    /**
     * fetches the country and population lists from the DB and returns them as an object
     */
    public async getData() {
        const countries = [];
        const countriesTmp = await this.answerService.getAnswers(2, 1);
        for (let i = 0; i < countriesTmp.length; i++) {
            countries.push(countriesTmp[i].translations[0].translation);
        }
        const population = [];
        const populationTmp = await this.answerService.getAnswers(4, 1);
        for (let j = 0; j < populationTmp.length; j++) {
            population.push(populationTmp[j].translations[0].translation);
        }
        return {
            countries,
            population,
        };
    }

    /**
     * fetches all possible translations of every country in the Array from the DB
     * @param input: array with countries
     */
    private async getCountriesInAllLanguages(input) {
        const countries = [];
        const answerIds = await this.answerService.getAnswerIdByString(input, 2, 1);
        const answerIdArr = [];
        const languages = await this.languageService.getLanguages();
        for (let j = 0; j < answerIds.length; j++) {
            answerIdArr.push(answerIds[j].id);
        }
        for (let i = languages.length - 1; i >= 0; i--) {
            if (answerIdArr.length > 0) {
                const answers = await this.answerService.getAnswerTranslations(answerIdArr, languages[i].id);
                for (let j = 0; j < answerIds.length; j++) {
                    if (answers[j].translations.length > 0) {
                        countries.push(answers[j].translations[0].translation);
                    }
                }
            }
        }
        return countries;
    }

    /**
     * sets the assessmentIds that should be in the statistical export
     * @param assessmentName
     */
    private setAssessmentFilter(assessmentName: string) {

        if (assessmentName === null)
            return [1, 2, 3, 4];

        if (assessmentName.includes('smp'))
            return [2, 3];

        if (assessmentName.includes('evaluation'))
            return [4];

        return [1, 2, 3, 4];
    }

    /**
     * fetches all questions from the DB and adds the titles to an array that is returned
     */
    private async getQuestionArray(languageId: number) {
        const questionEntries = await this.exportService.getAllQuestionTitles(languageId);
        const res = [];
        for (let j = 0; j < questionEntries.length; j++) {
            if (questionEntries[j].translations[0].title.length > 0) {
                res.push(
                    { id: questionEntries[j].id, title: questionEntries[j].translations[0].title },
                );
            }
        }
        return res;
    }

    private async getCategoryIDs(categories: string[]) {
        const categoriesArr = await this.exportService.getCategoryIDs(categories);
        const title = [];
        const id = [];
        for (let i = 0; i < categories.length; i++) {
            title.push(categoriesArr[i].value);
            id.push(categoriesArr[i].id);
        }
        return { id, title };
    }

    public async getCSV() {
        let result;
        try {
            await cache.get('CSVString', (err, res) => {
                if (err) {
                    throw err;
                }
                cache.reset();
                result = res;
                cache.del('CSVString', error => {
                    if (err) {
                        throw err;
                    }
                });
            });
        } catch (e) {
            throw e;
        }
        if (result === undefined || result === null) {
            throw new ServiceUnavailableException();
        } else if (result === 'an error occurred') {
            throw new InternalServerErrorException();
        }
        return { csvString: result };
    }

    private getGeneralEntryInfoTranslation(languageId: number) {
        // Header Structure: [{ key: String, Values: String[] }, values are index by language_code
        // Language IDs: (default, 0 = english), (1 = german)
        const all_languages = [
            { key: 'user_code', translations: ['User Code', 'Nutzer Code'] },
            { key: 'timestamp', translations: ['Timestamp', 'Zeitstempel'] },
            { key: 'language', translations: ['Language', 'Sprache'] },
            { key: 'name', translations: ['Name', 'Name'] },
            { key: 'email', translations: ['E-Mail', 'E-mail'] },
            { key: 'impression', translations: ['Impression', 'Eindruck'] },
            { key: 'country', translations: ['Country', 'Land'] },
            { key: 'city', translations: ['City', 'Stadt'] },
            { key: 'average_score', translations: ['Average score', 'Durchschnittliche Bewertung'] }

        ];
        const translation_idx = (languageId == null || languageId <= 1) ? 0 : (languageId - 1);
        return all_languages.map(l => ({ id: l.key, title: l.translations[translation_idx] }));
    }


    private async getAnswerId(selectedAnswer, qId, langId): Promise<number> {
        return (await this.answerService.getAnswerIdByString(selectedAnswer, qId, langId))[0].id;
    }
}
