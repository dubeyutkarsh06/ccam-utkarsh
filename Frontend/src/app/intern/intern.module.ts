import { NgModule } from '@angular/core';
import { InternComponent } from "./components/intern.component";
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [
    InternComponent,
  ],
  imports: [
    SharedModule
  ],
  exports: []
})
export class InternModule { }
