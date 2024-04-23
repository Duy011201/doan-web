import {Injectable} from '@angular/core';
import {RequestApiService} from '../core/services/request-api.service';
import {UrlApi} from '../core/settings/urlapi.setting';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private _requestApiService: RequestApiService) {
  }

  public login(body: object) {
    return this._requestApiService.postApi(`${UrlApi.AUTH_LOGIN}`, body).pipe(
      map((res) => {
        return res;
      })
    );
  }
}
