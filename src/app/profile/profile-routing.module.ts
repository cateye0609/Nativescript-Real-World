import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { ProfileArticlesComponent } from "./profile-articles/profile-articles.component";
import { ProfileFavoritesComponent } from "./profile-favorites/profile-favorites.component";
import { ProfileResolver } from "./profile-resolver.service";
import { ProfileComponent } from "./profile/profile.component";

const routes: Routes = [
    {
        path: 'profile/:username', component: ProfileComponent, children: [
            { path: '', component: ProfileArticlesComponent },
            { path: 'favorites', component: ProfileFavoritesComponent }
        ],
        resolve: {
            profile: ProfileResolver
        }
    },
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ProfileRoutingModule { }
