import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/shared/models';
import { hexToRgbA } from 'src/utils/common-utils';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {
  noteList: Note[] = [{
    name: 'Note 1',
    text: 'Note 1 Text',
    favorite: true,
    createdAt: new Date().toJSON()
  }, {
    name: 'Note 2',
    text: 'Note 2 Text',
    createdAt: new Date().toJSON()
  },{
    name: 'Note 3',
    text: 'Note 3 Text',
    favorite: true,
    important: true,
    color: '#7C0A02',
    createdAt: new Date().toJSON()
  },{
    name: 'Note 4',
    text: 'Note 4 Text',
    important: true,
    createdAt: new Date().toJSON()
  },{
    name: 'Note 5',
    text: 'Note 5 Text',
    color: '#00FFFF',
    createdAt: new Date().toJSON()
  },{
    name: 'Note 6',
    text: 'Note 6 Text',
    createdAt: new Date().toJSON()
  },{
    name: 'Note 7',
    text: 'Note 7 Text',
    createdAt: new Date().toJSON()
  },];

  selectedNote: Note = {
    name: '',
    text: ''
  };

  constructor() { }

  ngOnInit() {
    this.mapNoteColors()
  }

  mapNoteColors() {
    this.noteList = this.noteList.map(note => {
      if(note.color) {
        note.color = hexToRgbA(note.color, '.3');
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
  }

}
