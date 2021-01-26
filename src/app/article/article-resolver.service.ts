import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ArticleService } from '../_service/article.service';

@Injectable()
export class ArticleResolver {

  constructor(
    private router: RouterExtensions,
    private articleService: ArticleService
  ) { }
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.articleService.getArticle(route.params['slug'])
      .pipe(catchError(() => this.router.navigate(['/'])));
  }
}