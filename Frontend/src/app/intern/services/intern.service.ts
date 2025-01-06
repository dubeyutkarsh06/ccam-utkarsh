import { Injectable } from '@angular/core';
import { ExportService } from '../../shared/services/export/export.service';
import { ExportData } from '../../shared/models/export/exportData.interface';
import { ExportInterface } from '../../shared/models/response/export.interface';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { Intern_data } from '../../shared/models/response/intern_data.interface';

@Injectable({
  providedIn: 'root'
})
export class InternService {

  private data = new BehaviorSubject<Intern_data>(null);
  public data$ = this.data.asObservable();

  constructor(
    private exportService: ExportService,
  ) { }


  public async exportData(data: ExportData, progressSubject: Subject<string>, exportingSubject: Subject<boolean>) {
    const job_id = await this.exportService.exportData(data);
    
    const fetch_progress = setInterval(async () => {
      const progress = await this.exportService.getExportProgress(job_id);
      progressSubject.next(progress);

      if (progress == '100') {
        progressSubject.complete();
        exportingSubject.next(false);
        exportingSubject.complete();
        const res: any = await this.exportService.getExportedFile(job_id);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob([res], { type: res.type }));
        const d = new Date();
        const file_name = `SUMP_ADMIN-${d.getUTCFullYear()}_${d.getUTCMonth() + 1}_${d.getUTCDate()}.xlsx`;
        downloadLink.setAttribute('download', file_name);
        document.body.appendChild(downloadLink);
        downloadLink.click();
        clearInterval(fetch_progress);
      }

    }, 2000);

  }

  public async getLanguages() {
    return await this.exportService.getLanguages();
  }

  public async getData() {
    const res: Intern_data = await this.exportService.getData();
    this.data.next(res);
  }

}
