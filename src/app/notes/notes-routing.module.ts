import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotesComponent } from './notes.component';
import { NoteListComponent } from './note-list/note-list.component';

const routes: Routes = [{
  path: '',
  component: NotesComponent,
  children: [{
    path: 'list',
    component: NoteListComponent
  }, {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotesRoutingModule { }