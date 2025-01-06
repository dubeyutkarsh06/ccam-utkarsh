import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { InternService } from '../services/intern.service';

@Component({
  selector: 'app-intern',
  templateUrl: './intern.component.html',
  styleUrls: ['./intern.component.scss']
})
export class InternComponent implements OnInit {

  exporting: boolean = false;
  progress: number = 0

  public selectCountryData: string[] = [];
  public selectPopulationData: string[] = [];
  public selectCategoryNumber: number[] = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7
  ];

  public languageSelection: Array<LanguageSelection> = [
    {
      value: 'english',
      label: 'English'
    },
    {
      value: 'german',
      label: 'German'
    }
  ];

  public form = new FormGroup({
    fromDatePicker: new FormControl(),
    toDatePicker: new FormControl(),
    countries: new FormControl([]),
    assessment: new FormControl(),
    population: new FormControl([]),
    language: new FormControl(this.languageSelection[0].value),
    minimumScore: new FormControl(7),
    processActivePersons: new FormControl(),
    dataContainsTestFilter: new FormControl(false),
  });

  constructor(
    private internService: InternService,
  ) {
  }

  async ngOnInit() {
    this.languageSelection = await this.internService.getLanguages();
    await this.internService.getData();
    this.internService.data$.subscribe(value => {
      this.selectCountryData = value.countries;
      this.selectPopulationData = value.population;
    });
  }

  public export() {
    this.exporting = true;
    const progressSubject = new Subject<string>();
    const exportingSubject = new Subject<boolean>();
    progressSubject.subscribe(val => this.progress = parseFloat(val));
    exportingSubject.subscribe(val => this.exporting = val);
    this.internService.exportData(this.form.value, progressSubject, exportingSubject);
  }
}

interface LanguageSelection {
  value: string;
  label: string;
}
