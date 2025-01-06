import {Component, Input} from '@angular/core';


@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.scss']
})
export class FinishComponent {

  @Input() finish: { finish_text: string[], finish_links: string[] };

  constructor() {
  }
}
