import { HttpService } from "../../shared/services/http/http.service";
import {Injectable} from "@angular/core";
import {Marker} from "../../shared/models/start/marker.interface";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StartService {

  private startData = new BehaviorSubject<object>({
    reload_label: [],
    reload_button: [],
    title: [],
    subtitle: [],
    text1: [],
    text2: [],
    text3: [],
    text4: [],
    start_button: [],
    finish_text: []
  });
  public startData$ = this.startData.asObservable();

  constructor(
    private httpService : HttpService
  ) {}

  public async initialize() {
    this.startData.next(await this.httpService.getStartData().toPromise());
  }
}
