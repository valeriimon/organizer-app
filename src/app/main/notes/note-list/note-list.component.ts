import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/shared/models';
import { hexToRgbA, generatetKey } from 'src/utils/common-utils';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {
  noteList: Note[] = [{
    key: generatetKey('note'),
    name: 'Note 1',
    text: 'Note 1 Text',
    shortDescription: 'Short Descr',
    favorite: true,
    createdAt: new Date().toJSON()
  }, {
    key: generatetKey('note'),
    name: 'Note 2',
    text: 'Note 2 Text',
    shortDescription: 'Short Descr',
    createdAt: new Date().toJSON()
  },{
    key: generatetKey('note'),
    name: 'Note 3',
    text: 'Note 3 Text',
    shortDescription: 'Short Descr',
    favorite: true,
    important: true,
    color: '#7C0A02',
    createdAt: new Date().toJSON()
  },{
    key: generatetKey('note'),
    name: 'Note 4',
    text: 'Note 4 Text',
    shortDescription: 'Short Descr',
    important: true,
    createdAt: new Date().toJSON()
  },{
    key: generatetKey('note'),
    name: 'Note 5',
    text: 'Note 5 Text',
    shortDescription: 'Short Descr',
    color: '#00FFFF',
    createdAt: new Date().toJSON()
  },{
    key: generatetKey('note'),
    name: 'Note 6',
    text: 'Note 6 Text',
    shortDescription: 'Short Descr',
    createdAt: new Date().toJSON()
  },{
    key: generatetKey('note'),
    name: 'Note 7',
    text: 'Note 7 Text',
    shortDescription: 'Short Descr',
    createdAt: new Date().toJSON()
  },];

  noteAction: string = '';
  selectedNote: Note = {
    name: '',
    text: ''
  };

  noteManagementSidebar = {
    title: ''
  }

  constructor() { }

  ngOnInit() {
    this.mapNoteColors();
  }

  mapNoteColors() {
    this.noteList = this.noteList.map(note => {
      if(note.color) {
        note.colorRGBA = hexToRgbA(note.color, '.3');
      }
      return note
    })
  }

  toogleMark(ev: Event, status: 'favorite' | 'important' | string, idx: number) {
    ev.stopPropagation();
    const noteList = [...this.noteList];
    noteList[idx][status] = !noteList[idx][status];

    this.noteList = noteList;
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

  removeNote(key: string) {
    this.noteList = this.noteList.filter(note => note.key !== key);
  }

  onSubmitNote(newNote: Note) {
    if(this.noteAction === 'Edit') {
      this.noteList = this.noteList.map(note => {
        if(newNote.key === note.key) {
          if(newNote.color) {
            newNote.colorRGBA = hexToRgbA(newNote.color, '.3');
          }
          return newNote
        }
        return note;
      });

      return;
    }

    newNote = new Note(newNote);
    if(newNote.color) {
      newNote.colorRGBA = hexToRgbA(newNote.color, '.3');
    }
    this.noteList.push(newNote);
    console.log(this.noteList);
  }}
