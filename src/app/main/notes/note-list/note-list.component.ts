import { Component, OnInit, ViewChild } from '@angular/core';
import { Note, Tag } from 'src/app/shared/models';
import { hexToRgbA, generatetKey } from 'src/utils/common-utils';
import { NotesService } from '../services/notes.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TagsService } from '../../tags/services/tags.service';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {
  @ViewChild('noteManagement') noteMngSidebarInst: SidebarComponent
  noteList$: Observable<Note[]>;
  tagList$: Observable<Tag[]>;
  noteAction: string = '';
  selectedNote: Note = {
    name: '',
    text: ''
  };
  
  noteManagementSidebar = {
    title: ''
  }
  
  filteredByTags: Tag[] = [];
  get filterData() {
    return {tags: this.filteredByTags.map(t => t.name)}
  }

  constructor(
    private notesService: NotesService,
    private tagsService: TagsService
  ) { }

  ngOnInit() {
    this.noteList$ = this.notesService.onNotes();
    this.tagList$ = this.tagsService.onTags();
  }

  getNotes() {
    this.notesService.fetchNotes(this.filterData).subscribe();
  }

  filterNote(tag: Tag, action: 'Add' | 'Remove') {
    action === 'Add' ? this.filteredByTags.push(tag) :
      this.filteredByTags = this.filteredByTags.filter(t => t.id !== tag.id);

    this.getNotes();
  }

  editNote(note: Note) {
    this.selectedNote = note;
    this.noteAction = 'Edit';
    this.noteManagementSidebar.title = 'Edit Note';
  }

  createNote() {
    this.selectedNote = { name: '', text: '' };
    this.noteAction = 'Add';
    this.noteManagementSidebar.title = 'Create Note'
  }

  removeNote(ev: Event, noteId: string) {
    ev.stopPropagation();
    this.notesService.removeNote(noteId)
      .pipe(
        tap(() => this.getNotes())
      )
      .subscribe()
  }

  onSubmitNote(newNote: Note) {
    this.noteMngSidebarInst.close();
    if(this.noteAction === 'Edit') {
      this.notesService.updateNote(newNote)
        .pipe(
          tap(() => this.getNotes())
        )
        .subscribe();
      
      return
    }

    this.notesService.createNote(newNote)
      .pipe(
        tap(() => this.getNotes())
      )  
      .subscribe();
  }}
