import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from "@nativescript/angular";
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleProfileResolver } from './article-profile-resolver.service';
import { ArticleResolver } from './article-resolver.service';

const routes: Routes = [
    {
        path: 'article/:slug',
        component: ArticleDetailComponent,
        resolve: {
            article: ArticleResolver,
            current_user: ArticleProfileResolver
        }
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ArticleRoutingModule { }
