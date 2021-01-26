import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ArticleService } from '../_service/article.service';
import * as applicationSettings from '@nativescript/core/application-settings';

@Injectable()
export class EditorResolver {

  constructor(
    private router: RouterExtensions,
    private articleService: ArticleService
  ) { }
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const username = applicationSettings.getString('username');
    return this.articleService.getArticle(route.params['slug'])
      .pipe(
        map(res => {
          if (res.author.username === username) {
            return res;
          } else {
            this.router.navigate(['/']);
          }
        }),
        catchError(() => this.router.navigate(['/'])));
  }
}
