import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from '../_service/user.service';

@Injectable()
export class ProfileResolver {

  constructor(
    private router: RouterExtensions,
    private userService: UserService
  ) { }
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.userService.getProfile(route.params['username'])
      .pipe(catchError(() => this.router.navigate(['/'])));
  }
}