import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/develop.environment';
import {Observable} from 'rxjs';

@Injectable()
export class RequestApiService {
  constructor(private http: HttpClient) {
  }

  postApi(url: string, body?: object): Observable<any> {
    return this.http.post(`${environment.API_URL}/${url}`, body);
  }

  getApi(url: string, body: object): Observable<any> {
    return this.http.get(`${environment.API_URL}/${url}`, body);
  }

//  postApiByHeader(apiUrl: string, dataInfo: any): Observable<any> {
//    const headers = new HttpHeaders({
//      'Accept': 'application/json',
//      'Content-Type': 'application/json',
//      'Authorization': 'Bearer ' + localStorage.getItem(ConstSettings.TOKEN_KEY)
//    });
//    const options = { headers: headers };
//    dataInfo.language = localStorage.getItem('lang') || ConstSettings.defaultLanguage;
//    return this.http.post(`${environment.API_URL}/${apiUrl}`, dataInfo, options);
//  }
}