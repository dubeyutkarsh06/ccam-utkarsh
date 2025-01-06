import { Component, OnInit, ViewChild, OnChanges, SimpleChanges, Input } from '@angular/core';
import { MatTableDataSource, MatTable, MatPaginator } from '@angular/material';
import { UuidService } from 'src/app/shared/services/uuid/uuid.service';
import { EvaluationService } from '../../services/evaluation/evaluation.service';
import { Question } from 'src/app/shared/models/question/question';
import {RecordTranslation} from "../../../shared/models/response/recordTranslation";

@Component({
    selector: 'app-question-table',
    templateUrl: './question-table.component.html',
    styleUrls: ['./question-table.component.scss']
})
export class QuestionTableComponent implements OnInit, OnChanges {

    @Input() comparison: { questions: Question[], uuid: string, language: number};

    public dataSource: MatTableDataSource<any>;
    public displayedColumns: string[] = ['id'];

    @ViewChild(MatTable) table: MatTable<any>;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        public uuidService: UuidService,
        private evaluationService: EvaluationService,
    ) { }

    ngOnInit() {
        this.displayedColumns.push(this.uuidService.getUuid());
        this.dataSource = new MatTableDataSource(this.initDataSource());
        setTimeout(() => {
            this.dataSource.paginator = this.paginator;
        });
    }

    async ngOnChanges(changes: SimpleChanges) {
        if (changes.comparison.currentValue !== undefined && !this.displayedColumns.includes(changes.comparison.currentValue.uuid)) {
            const comparison = changes.comparison.currentValue;
            const record: RecordTranslation[] = await this.evaluationService.getRecordTranslation(comparison.questions, comparison.language);
            await this.addToDatasource(record, comparison.uuid);
            await this.displayedColumns.push(comparison.uuid);
            await this.table.renderRows();
        }
    }

    /**
     * Init datasource with personal information
     */
    private initDataSource() {
        const questions = this.evaluationService.questions;
        const uuid = this.uuidService.getUuid();
        const arr = [];

        questions.forEach(q => {
          if(q.title.length > 0) {
            const tmp = { id: q.title };
            tmp[uuid] = q.selectedAnswers;
            arr.push(tmp);
          }
        });
      return arr;
    }

    /**
     * Add column with comparison data to table
     * @param questions Comparison questions
     * @param uuid Comparison UUID
     */
    private addToDatasource(questions: RecordTranslation[], uuid: string) {
      const questionIds = questions.map(q => q.title);
        const tmpDatasource = this.dataSource.data;

        for (const item of tmpDatasource) {
            const idx = questionIds.indexOf(item.id);
            if (idx !== -1) {
                item[uuid] = questions[idx].selectedAnswers;
            }
        }
        return tmpDatasource;
    }

    async setPaginatorToAll() {
      await this.paginator._changePageSize(this.dataSource.data.length);
      return document.getElementById('question-table-data');
    }

    resetPaginator() {
      this.paginator._changePageSize(5);
    }
}
