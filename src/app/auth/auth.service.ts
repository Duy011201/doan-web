import { Injectable } from '@angular/core';
import { RequestApiService } from '../core/services/request-api.service';
import { UrlApi } from '../core/settings/urlapi.setting';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _requestApiService: RequestApiService) {}

  login(body: object) {
    return this._requestApiService.postApi(`${UrlApi.AUTH_LOGIN}`, body).pipe(
      map((res) => {
        return res;
      })
    );
  }
}
