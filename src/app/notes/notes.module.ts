import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesRoutingModule } from './notes-routing.module';
import { NotesComponent } from './notes.component';
import { NoteListComponent } from './note-list/note-list.component';
import { SharedModule } from '../shared/shared.module';
import { NoteShortDetailsComponent } from './note-short-details/note-short-details.component';
import { NoteManagementComponent } from './note-management/note-management.component';

@NgModule({
  declarations: [
    NotesComponent,
    NoteListComponent,
    NoteShortDetailsComponent,
    NoteManagementComponent
  ],
  imports: [
    CommonModule,
    NotesRoutingModule,
    SharedModule
  ]
})
export class NotesModule { }
