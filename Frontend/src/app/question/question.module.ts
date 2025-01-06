import { NgModule } from '@angular/core';
import { QuestionComponent } from './components/question.component';
import { QuestionCheckboxComponent } from './components/question-checkbox/question-checkbox.component';
import { QuestionRadioComponent } from './components/question-radio/question-radio.component';
import { QuestionFreeComponent } from './components/question-free/question-free.component';
import { SharedModule } from '../shared.module';
import { QuestionNavigationComponent } from './components/question-navigation/question-navigation.component';
import { PieChartComponent } from './components/question-free/pie-chart/pie-chart.component';
import { QuestionDropdownComponent } from './components/question-dropdown/question-dropdown.component';
import { UuidDialogComponent } from './dialogs/uuid-dialog/uuid-dialog.component';

@NgModule({
    declarations: [
        QuestionComponent,
        QuestionCheckboxComponent,
        QuestionFreeComponent,
        QuestionRadioComponent,
        QuestionNavigationComponent,
        PieChartComponent,
        QuestionDropdownComponent,
        UuidDialogComponent,
    ],
    imports: [
        SharedModule
    ],
    exports: [],
    entryComponents: [UuidDialogComponent]
})
export class QuestionModule { }
