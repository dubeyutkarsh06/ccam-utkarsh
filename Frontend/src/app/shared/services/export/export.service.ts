import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { ExportData } from '../../models/export/exportData.interface';
import { ExportInterface } from '../../models/response/export.interface';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { map, tap, last, catchError, mergeMap } from 'rxjs/operators';
import { interval, Subject, Subscription } from 'rxjs';
import { nextTick } from 'process';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor(
    private httpService: HttpService,
  ) { }

  public async exportData(data: ExportData) {
    return await this.httpService.exportData(data).toPromise().then(job_id => job_id);
  }

  public async getExportProgress(job_id: string) {
    return await this.httpService.getExportProgress(job_id).toPromise().then(progress => progress);
  }

  public async getExportedFile(job_id: string) {
    return this.httpService.getExportedXLS(job_id).toPromise().then((res: any) => res);
  }


  public async getData() {
    return await this.httpService.getData().toPromise();
  }


  public async getLanguages() {
    return await this.httpService.getLanguages().toPromise();
  }
}
