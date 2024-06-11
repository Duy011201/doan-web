import {Injectable} from '@angular/core';
import {RequestApiService} from '../core/services/request-api.service';
import {UrlApi} from '../core/configs/urlapi.config';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private _requestApiService: RequestApiService) {
  }

  public getAllRole(body: object) {
    return this._requestApiService.postApiHeader(`${UrlApi.ADMIN_GET_ALL_ROLE}`, body).pipe(
      map((res) => {
        return res;
      })
    );
  }

  public getAllUser(body: object) {
    return this._requestApiService.postApiHeader(`${UrlApi.ADMIN_GET_ALL_USER}`, body).pipe(
      map((res) => {
        return res;
      })
    );
  }

  public updateUser(body: object) {
    return this._requestApiService.postApiHeader(`${UrlApi.ADMIN_UPDATE_USER}`, body).pipe(
      map((res) => {
        return res;
      })
    );
  }

  public createUser(body: object) {
    return this._requestApiService.postApiHeader(`${UrlApi.ADMIN_CREATE_USER}`, body).pipe(
      map((res) => {
        return res;
      })
    );
  }

  public resetPassword(body: object) {
    return this._requestApiService.postApiHeader(`${UrlApi.ADMIN_RESET_PASSWORD_USER}`, body).pipe(
      map((res) => {
        return res;
      })
    );
  }

  public deleteUser(body: object) {
    return this._requestApiService.postApiHeader(`${UrlApi.ADMIN_DELETE_USER}`, body).pipe(
      map((res) => {
        return res;
      })
    );
  }

  public lockUser(body: object) {
    return this._requestApiService.postApiHeader(`${UrlApi.ADMIN_LOCK_USER}`, body).pipe(
      map((res) => {
        return res;
      })
    );
  }
}
