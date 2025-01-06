import {FormControl} from '@angular/forms';

export interface ExportData {
  fromDatePicker: Date;
  toDatePicker: Date;
  country: string[];
  assessment: string;
  population: string[];
  minimumScore: number;
  processActivePersons: boolean;
  dataContainsTestFilter: boolean;
}
