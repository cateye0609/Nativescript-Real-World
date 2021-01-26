import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { ArticleModule } from '../article/article.module';
@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        NativeScriptCommonModule,
        SharedModule,
        ArticleModule,
        HomeRoutingModule
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class HomeModule { }
