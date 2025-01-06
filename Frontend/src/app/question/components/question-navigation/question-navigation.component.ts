import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-question-navigation',
  templateUrl: './question-navigation.component.html',
  styleUrls: ['./question-navigation.component.scss']
})
export class QuestionNavigationComponent {

  @Output() navClick = new EventEmitter(true);
  @Input() questionId;
  @Input() button_previous: string[];
  @Input() button_restart: string[];
  @Input() button_next: string[];
  constructor() { }

  public nextClick() {
    this.navClick.emit('next');
  }

  public lastClick() {
    this.navClick.emit('last');
  }

  public reload() {
    window.location.reload(true);
  }
}
