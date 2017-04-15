import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { MdSnackBar } from '@angular/material';

import { AuthService } from './auth.service';

@Injectable()
export class HttpClient {
  private urlPrefix: string;

  constructor(
    private _snackbar: MdSnackBar,
    private _http: Http,
    private _authService: AuthService,
    ) {
    // TODO: Get url from config
    this.urlPrefix = 'http://localhost:3000/api';
  }

  get(url) {
    const result = this._http.get(this._fullUrl(url), this._getOptions());
    this._subscribe(result)
    return result;
  }

  post(url, data) {
    const result = this._http.post(this._fullUrl(url), data, this._getOptions());
    this._subscribe(result)
    return result;
  }

  private _fullUrl(url): string {
    return this.urlPrefix + url;
  }

  private _subscribe(response) {
    response.subscribe(
      ok => {},
      err => this._processError(err),
      () => {}
    );
  }

  private _processError(error) {
    console.error('http.client.error', error);
    if (error.status === 403) {
      console.log('Authentication error');
      this._authService.clearToken();
    } else {
      this._snackbar.open('Error performing request', '', {
        duration: 2000
      });
    }
  }

  private _getOptions(): any {
    const headers = new Headers();
    if (this._authService.isAuthenticated()) {
      headers.append('X-Authentication', this._authService.getToken());
    }
    return {headers: headers};
  }
}