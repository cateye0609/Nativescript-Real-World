import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../_guard/auth.guard';
import { EditorResolver } from './editor-resolver.service';
import { EditorComponent } from './editor/editor.component';

const routes: Routes = [
    { path: 'editor', component: EditorComponent, canActivate: [AuthGuard] },
    {
        path: 'editor/:slug',
        component: EditorComponent,
        canActivate: [AuthGuard],
        resolve: { article: EditorResolver }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EditorRoutingModule { }
