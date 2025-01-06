import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from "../../auth/services/auth.service";
import { MockData } from './mockData';

@Injectable()
export class MockInterceptor implements HttpInterceptor {
    baseUrl = "http://localhost:3000/api/"
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log(request.url)
        // const mockData = new MockData();
        // if(request.url.startsWith(this.baseUrl + "record/uuid/English") ||
        //     request.url.startsWith(this.baseUrl + "record/" + mockData.uuid.uuid + "/English" )) {
        //         return next.handle(request);
        //     const customResponse = mockData.uuid;
        //     return of(new HttpResponse({ status: 200, body: customResponse }));
        // }
        // if (request.url == this.baseUrl + "questions/popup/English") {
        //     const customResponse = mockData.popupText;
        //     return of(new HttpResponse({ status: 200, body: customResponse }));
        // }
        // if (request.url == this.baseUrl + "start/texts/English") {
        //     const customResponse = mockData.startTexts;
        //     return of(new HttpResponse({ status: 200, body: customResponse }));
        // }
        // if (request.url == this.baseUrl + "navigation/English") {
        //     const customResponse = mockData.navigationTexts;
        //     return of(new HttpResponse({ status: 200, body: customResponse }));
        // }
        // if (request.url == this.baseUrl + "questions/English/0") {
        //     const customResponse = mockData.questionText0;
        //     return of(new HttpResponse({ status: 200, body: customResponse }));
        // }
        // if (request.url == this.baseUrl + "questions/English/1") {
        //     const customResponse = mockData.questionText1;
        //     return of(new HttpResponse({ status: 200, body: customResponse }));
        // }
        // else {
        //     const customResponse = [];
        //     return of(new HttpResponse({ status: 200, body: customResponse }));
        // }
        return next.handle(request);
    }
}
