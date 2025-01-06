import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NavigationComponent} from './components/navigation.component';
import {StartComponent} from '../start/components/start.component';
import {QuestionComponent} from '../question/components/question.component';
import {EvaluationComponent} from '../evaluation/components/evaluation.component';
import {InternComponent} from '../intern/components/intern.component';
import {AuthGuard} from '../auth/guards/auth.guard';
import {LoginComponent} from '../login/component/login.component';
import {ImpressumComponent} from '../impressum/component/impressum.component';

const routes: Routes = [
  {
    path: '',
    component: NavigationComponent, children: [
      {path: 'start', component: StartComponent},
      {path: 'questions/:category', component: QuestionComponent},
      {path: 'results', component: EvaluationComponent},
      {path: 'login', component: LoginComponent},
      {path: 'intern', component: InternComponent, canActivate: [AuthGuard]},
      {path: 'imprint', component: ImpressumComponent},
      {path: '**', redirectTo: 'start', pathMatch: 'full'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class NavigationRoutingModule {
}
