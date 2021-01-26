import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { SettingResolver } from './setting-resolver.service';
import { SettingComponent } from './setting/setting.component';

const routes: Routes = [
    {
        path: 'settings',
        component: SettingComponent,
        resolve: {
            user: SettingResolver
        }
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class SettingRoutingModule { }
