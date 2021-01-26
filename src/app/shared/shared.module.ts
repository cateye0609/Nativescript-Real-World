import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule, NativeScriptRouterModule } from '@nativescript/angular';
import { ActionBarComponent } from './layout/action-bar/action-bar.component';
import { PaginationComponent } from './pagination/pagination.component';
import { LoadingComponent } from './loading/loading.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpTokenInterceptor } from '../_interceptor/http.interceptor';
import { LabelMaxLinesDirective } from '../_directive/maxline.directive';
@NgModule({
    declarations: [
        ActionBarComponent,
        PaginationComponent,
        LoadingComponent,
        LabelMaxLinesDirective
    ],
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule
    ],
    exports: [
        ActionBarComponent,
        PaginationComponent,
        LoadingComponent,
        NativeScriptRouterModule,
        LabelMaxLinesDirective
    ],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },],
    schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule { }
