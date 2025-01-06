import { NgModule } from '@angular/core';
import { NavigationComponent } from './components/navigation.component';
import { SharedModule } from '../shared.module';
import { NavigationRoutingModule } from './navigation.routing.module';
import { StartComponent } from '../start/components/start.component';
import { QuestionModule } from '../question/question.module';
import { EvaluationModule } from '../evaluation/evaluation.module';
import { LanguageComponent } from './components/language/language.component';
import { InternModule } from '../intern/intern.module';
import { LoginModule } from "../login/login.module";
import { ImpressumModule } from "../impressum/impressum.module";

@NgModule({
  declarations: [
    NavigationComponent,
    StartComponent,
    LanguageComponent,
  ],
  imports: [
    NavigationRoutingModule,
    QuestionModule,
    EvaluationModule,
    SharedModule,
    InternModule,
    LoginModule,
    ImpressumModule,
  ],
  exports: [NavigationComponent]
})
export class NavigationModule { }
