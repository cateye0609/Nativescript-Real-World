import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular';
import { SharedModule } from '../shared/shared.module';
import { SettingResolver } from './setting-resolver.service';
import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting/setting.component';

@NgModule({
    declarations: [
        SettingComponent
    ],
    imports: [
        NativeScriptCommonModule,
        SharedModule,
        ReactiveFormsModule,
        NativeScriptFormsModule,
        SettingRoutingModule
    ],
    providers: [SettingResolver],
    schemas: [NO_ERRORS_SCHEMA]
})
export class SettingModule { }
