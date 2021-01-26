import { Injectable } from '@angular/core';
import { RouterExtensions } from '@nativescript/angular';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from '../_service/user.service';
import * as applicationSettings from '@nativescript/core/application-settings';

@Injectable({
  providedIn: 'root'
})
export class ArticleProfileResolver {

  constructor(
    private router: RouterExtensions,
    private userService: UserService
  ) { }
  resolve(): Observable<any> {
    if (applicationSettings.hasKey('username')) {
      return this.userService.getProfile(applicationSettings.getString('username'))
        .pipe(catchError(() => this.router.navigate(['/'])));
    }
    return null;
  }
}
