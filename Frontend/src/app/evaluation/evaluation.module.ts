import { NgModule } from '@angular/core';
import { RadarChartComponent } from './components/radar-chart/radar-chart.component';
import { EvaluationComponent } from './components/evaluation.component';
import { SharedModule } from '../shared.module';
import { QuestionTableComponent } from './components/question-table/question-table.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { FinishComponent } from './components/finish/finish.component';

@NgModule({
    declarations: [
        EvaluationComponent,
        RadarChartComponent,
        QuestionTableComponent,
        FeedbackComponent,
        FinishComponent,
    ],
    imports: [
        SharedModule
    ],
    exports: []
})
export class EvaluationModule { }
