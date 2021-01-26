import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ArticlesListComponent } from './article-list/articles-list.component';
import { SharedModule } from '../shared/shared.module';
import { NativeScriptCommonModule, NativeScriptFormsModule, NativeScriptHttpClientModule } from '@nativescript/angular';
import { ArticleRoutingModule } from './article-routing.module';
import { ArticleProfileResolver } from './article-profile-resolver.service';
import { ArticleResolver } from './article-resolver.service';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleCommentComponent } from './article-comment/article-comment.component';
import { FormsModule } from '@angular/forms';
@NgModule({
    declarations: [
        ArticlesListComponent,
        ArticleDetailComponent,
        ArticleCommentComponent
    ],
    imports: [
        NativeScriptCommonModule,
        SharedModule,
        FormsModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        ArticleRoutingModule
    ],
    exports: [
        ArticlesListComponent
    ],
    providers: [ArticleResolver, ArticleProfileResolver],
    schemas: [NO_ERRORS_SCHEMA]
})
export class ArticleModule { }
