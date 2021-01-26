import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CommonService } from './common.service';

import { SettingsModel } from '../_model/setting.model';
import { ProfileResponse, UserResponse } from '../_model/response.model';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import * as applicationSettings from '@nativescript/core/application-settings';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  is_logged_in: boolean;

  constructor(
    private http: HttpClient,
    private commonService: CommonService,
    private authService: AuthService,
    private router: Router
  ) {
    this.getAuthState();
  }

  // get auth state
  getAuthState() {
    this.authService.logged_in$.subscribe(
      auth => this.is_logged_in = auth
    );
  }

  // get current user
  getUser() {
    return this.http.get<UserResponse>(`${environment.api_url}/user`)
      .pipe(
        map(res => {
          applicationSettings.setString('username', res.user.username);
          return res.user;
        }),
        catchError(err => this.commonService.handleError(err))
      );
  }

  // update user
  updateSettings(data: SettingsModel) {
    const body = {
      'user': data
    };
    return this.http.put<UserResponse>(`${environment.api_url}/user`, body)
      .pipe(
        map(res => res.user),
        catchError(err => this.commonService.handleError(err))
      );
  }

  // get user's profile
  getProfile(username: string) {
    return this.http.get<ProfileResponse>(`${environment.api_url}/profiles/${username}`)
      .pipe(
        map(res => res.profile),
        catchError(err => this.commonService.handleError(err))
      );
  }

  // follow user
  followUser(username: string) {
    if (!this.is_logged_in) {
      this.router.navigate(['/login']);
      return;
    }
    return this.http.post<ProfileResponse>(`${environment.api_url}/profiles/${username}/follow`, null)
      .pipe(
        map(res => res.profile),
        catchError(err => this.commonService.handleError(err))
      );
  }

  // unfollow user
  unfollowUser(username: string) {
    if (!this.is_logged_in) {
      this.router.navigate(['/login']);
      return;
    }
    return this.http.delete<ProfileResponse>(`${environment.api_url}/profiles/${username}/follow`)
      .pipe(
        map(res => res.profile),
        catchError(err => this.commonService.handleError(err))
      );
  }
}
