import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { EditorComponent } from './editor/editor.component';
import { SharedModule } from '../shared/shared.module';
import { EditorRoutingModule } from './editor-routing.module';
import { EditorResolver } from './editor-resolver.service';
import { FormsModule } from '@angular/forms';
import { NativeScriptCommonModule, NativeScriptFormsModule } from '@nativescript/angular';

@NgModule({
  declarations: [EditorComponent],
  imports: [
    NativeScriptCommonModule,
    SharedModule,
    FormsModule,
    NativeScriptFormsModule,
    EditorRoutingModule
  ],
  providers: [EditorResolver],
  schemas: [NO_ERRORS_SCHEMA]
})
export class EditorModule { }
