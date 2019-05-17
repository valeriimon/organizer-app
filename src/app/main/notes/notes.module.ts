import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesRoutingModule } from './notes-routing.module';
import { NotesComponent } from './notes.component';
import { NoteListComponent } from './note-list/note-list.component';
import { SharedModule } from '../../shared/shared.module';
import { NoteDetailsComponent } from './note-details/note-details.component';
import { NoteManagementComponent } from './note-management/note-management.component';
import { TagsModule } from '../tags/tags.module';
import { NotesService } from './services/notes.service';

@NgModule({
  declarations: [
    NotesComponent,
    NoteListComponent,
    NoteDetailsComponent,
    NoteManagementComponent,
  ],
  imports: [
    CommonModule,
    NotesRoutingModule,
    SharedModule,
    TagsModule
  ],
  providers: [NotesService]
})
export class NotesModule { }
