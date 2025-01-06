import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import {ImpressumComponent} from "./component/impressum.component";

@NgModule({
  declarations: [
    ImpressumComponent,
  ],
  imports: [
    SharedModule
  ],
  exports: []
})
export class ImpressumModule { }
