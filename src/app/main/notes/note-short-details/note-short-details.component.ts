import { Component, OnInit, Input } from '@angular/core';
import { Note } from 'src/app/shared/models';

@Component({
  selector: 'app-note-short-details',
  templateUrl: './note-short-details.component.html',
  styleUrls: ['./note-short-details.component.scss']
})
export class NoteShortDetailsComponent implements OnInit {
  @Input() note: Note;
  constructor() { }

  ngOnInit() {
  }

}
