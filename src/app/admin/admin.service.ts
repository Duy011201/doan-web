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

  public getAll(body: object) {
    return this._requestApiService.postApiHeader(`${UrlApi.ADMIN_GET_ALL_USER}`, body).pipe(
      map((res) => {
        return res;
      })
    );
  }
}
