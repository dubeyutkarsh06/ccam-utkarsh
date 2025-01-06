import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import {LoginComponent} from "./component/login.component";

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    SharedModule
  ],
  exports: []
})
export class LoginModule { }
