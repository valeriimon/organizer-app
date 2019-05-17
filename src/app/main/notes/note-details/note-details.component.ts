import { Component, OnInit, Input } from '@angular/core';
import { Note } from 'src/app/shared/models';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent implements OnInit {
  @Input() note: Note;
  constructor() { }

  ngOnInit() {
  }

}
