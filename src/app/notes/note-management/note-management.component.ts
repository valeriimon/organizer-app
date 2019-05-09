import { Component, OnInit, Input } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Note } from 'src/app/shared/models';

@Component({
  selector: 'app-note-management',
  templateUrl: './note-management.component.html',
  styleUrls: ['./note-management.component.scss']
})
export class NoteManagementComponent implements OnInit {
  @Input() note: Note = {
    name: '',
    text: ''
  }
  editorData: string;
  Editor = ClassicEditor;

  constructor() { }

  ngOnInit() {
  }

}
