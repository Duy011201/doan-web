import { Injectable } from '@angular/core';
import { RequestApiService } from '../core/services/request-api.service';
import { UrlApi } from '../core/configs/urlapi.config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _requestApiService: RequestApiService) {}

  public login(body: object) {
    return this._requestApiService.postApi(`${UrlApi.AUTH_LOGIN}`, body).pipe(
      map((res) => {
        return res;
      })
    );
  }

  public verifyCode(body: object) {
    return this._requestApiService
      .postApi(`${UrlApi.AUTH_VERIFY_CODE}`, body)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public register(body: object) {
    return this._requestApiService
      .postApi(`${UrlApi.AUTH_REGISTER}`, body)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }

  public forgotPassword(body: object) {
    return this._requestApiService
      .postApi(`${UrlApi.AUTH_FORGOT_PASSWORD}`, body)
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
