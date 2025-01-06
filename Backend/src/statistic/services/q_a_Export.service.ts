import {Injectable} from "@nestjs/common";
import {RecordService} from "../../record/service/record.service";
import {createObjectCsvStringifier as createCsvWriter} from "csv-writer";
import {ExportService} from "../../shared/export/export.service";
import {LanguageService} from "../../shared/language/language.service";

@Injectable()
export class Q_a_ExportService {

    constructor(
        private recordService: RecordService,
        private exportService: ExportService,
        private languageService: LanguageService,
    ) {}

    public async getExportData(input: string[], language: string) {
        let record;
        let answers = [];
        const result = [];
        let header = [{id: 'user_code', title: 'User Code'}];
        const languageId = (await this.languageService.getLanguageId(language)).id;
        header = header.concat(await  this.getQuestionArray(languageId));
        result.push(header);
        let questions;
        for (let i = 0; i < input.length; i++ ) {
            let tmp = {};
            answers = [];
            record = await this.recordService.getRecord(input[i]);
            questions = record.record;
            tmp["user_code"] = input[i];
            for (let j = 0; j < questions.length; j++) {
                const question = questions[j];
                answers.push({'id': question.id, "value": question.selectedAnswers})
            }
            for (let a = 0; a < answers.length; a++) {
                tmp[answers[a].id] = answers[a].value;
            }
            result.push(tmp);
        }
        return await this.getCSVString(result)
    }

    /**
     * converts an n x m array matrix into a csv string
     * @param data
     */
    private async getCSVString(data) {
        const csvWriter = createCsvWriter({header: data[0], fieldDelimiter: ';'});
        const records = [];
        for (let i = 1; i < data.length; i++) {
            records.push(data[i]);
        }
        const string = csvWriter.getHeaderString() + csvWriter.stringifyRecords(records);
        return {csvString: string}
    }

    /**
     * fetches all questions from the DB and adds the titles to an array that is returned
     */
    private async getQuestionArray(language: number) {
        const questionEntries = await this.exportService.getAllQuestionTitlesByLanguage(language);
        const res = [];
        for (let j = 0; j < questionEntries.length; j++) {
            if (questionEntries[j].translations[0].title.length > 0) {
                res.push(
                    {id: questionEntries[j].id, title: questionEntries[j].translations[0].title}
                );
            }
        }
        return res;
    }
}
