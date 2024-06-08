import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/develop.environment';
import {Observable} from 'rxjs';
import {getFromLocalStorage, removeQuotes} from '../commons/func'

@Injectable()
export class RequestApiService {
  constructor(private http: HttpClient) {
  }

  public getAuthHeaders(): HttpHeaders {
    const token = removeQuotes(getFromLocalStorage('token'));
      return new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
  }

  postApi(url: string, body?: object): Observable<any> {
    return this.http.post(`${environment.API_URL}/${url}`, body);
  }

  getApi(url: string, body: object): Observable<any> {
    return this.http.get(`${environment.API_URL}/${url}`, body);
  }

  postApiHeader(apiUrl: string, data: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${environment.API_URL}/${apiUrl}`, data, {headers});
  }
}
