import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ArticleModule } from '../article/article.module';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { SharedModule } from '../shared/shared.module';
import { ProfileArticlesComponent } from './profile-articles/profile-articles.component';
import { ProfileFavoritesComponent } from './profile-favorites/profile-favorites.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ProfileResolver } from './profile-resolver.service';

@NgModule({
    declarations: [
        ProfileComponent,
        ProfileArticlesComponent,
        ProfileFavoritesComponent
    ],
    imports: [
        NativeScriptCommonModule,
        SharedModule,
        ArticleModule,
        ProfileRoutingModule
    ],
    providers: [ProfileResolver],
    schemas: [NO_ERRORS_SCHEMA]
})
export class ProfileModule { }
