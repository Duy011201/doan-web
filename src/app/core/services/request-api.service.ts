import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/develop.environment';
import {Observable} from 'rxjs';
import {getFromLocalStorage, removeQuotes} from '../commons/func'

@Injectable()
export class RequestApiService {
  constructor(private http: HttpClient) {
  }

  private static getAuthHeaders(): HttpHeaders {
    const token = getFromLocalStorage('token');
    if (token !== null) {
      return new HttpHeaders({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${removeQuotes(getFromLocalStorage('token'))}`
      });
    }
    return new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    });
  }

  postApi(url: string, body?: object): Observable<any> {
    return this.http.post(`${environment.API_URL}/${url}`, body);
  }

  getApi(url: string, body: object): Observable<any> {
    return this.http.get(`${environment.API_URL}/${url}`, body);
  }

  postApiHeader(apiUrl: string, body: any): Observable<any> {
    const headers = RequestApiService.getAuthHeaders();
    const token = getFromLocalStorage('token');
    if (token !== null) {
      body.token = removeQuotes(getFromLocalStorage('token'));
    }
    return this.http.post(`${environment.API_URL}/${apiUrl}`, body, {headers});
  }

  private static getAuthHeadersFile(): HttpHeaders {
    const token = removeQuotes(getFromLocalStorage('token'));
    if (token !== null) {
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    }
    return new HttpHeaders({});
  }

  postApiHeaderFile(apiUrl: string, body: any, files?: File[]): Observable<any> {
    const headers = RequestApiService.getAuthHeadersFile();
    const formData: FormData = new FormData();

    for (const key in body) {
      if (body.hasOwnProperty(key)) {
        formData.append(key, body[key]);
      }
    }

    if (files && Array.isArray(files)) {
      for (const file of files) {
        if (file) {
          formData.append('files', file, file.name);
        } else {
          console.error('File object is undefined');
        }
      }
    } else {
      console.error('No files provided or files is not an array');
    }

    return this.http.post(`${environment.API_URL}/${apiUrl}`, formData, {headers});
  }
}
