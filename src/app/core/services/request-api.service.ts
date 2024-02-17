import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../environments/develop.environment';
import { constant } from '../settings/constant.setting';
import { Observable } from 'rxjs';

@Injectable()
export class RequestApiService {
  public header: any;
  headersPostApi: any;
  constructor(private http: HttpClient) {}

  postApi(url: string, body?: object) {
    return this.http
      .post(`${environment.API_URL}/${url}`, body)
      .pipe(map((data: any) => data));
  }
  getApiBody(url: string, body: object) {
    return this.http
      .get(`${environment.API_URL}/${url}`, body)
      .pipe(map((data: any) => data));
  }
  // postApiByHeader(apiUrl: string, dataInfo: any): Observable<any> {
  //   this.headersPostApi = {
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Bearer ' + localStorage.getItem(ConstSettings.TOKEN_KEY)
  //     }
  //   };
  //   dataInfo.language = localStorage.getItem('lang') || ConstSettings.defaultLanguage;
  //   return this.http.post(`${environment.API_URL}/${apiUrl}`, dataInfo, this.headersPostApi)
  //     .pipe(
  //       map(
  //         res => {
  //           //console.log(res);
  //           return res;
  //         }
  //       ));
  // }
}
