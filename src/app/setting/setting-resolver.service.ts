import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from '../_service/user.service';
import { RouterExtensions } from "@nativescript/angular";

@Injectable()
export class SettingResolver {

  constructor(
    private router: RouterExtensions,
    private userService: UserService
  ) { }
  resolve(): Observable<any> {
    return this.userService.getUser()
      .pipe(catchError(() => this.router.navigate(['/'])));
  }
}