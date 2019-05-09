import { Component } from '@angular/core';
import { Tab } from '../shared/models';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})

export class NotesComponent {
  tabList: Tab[] = [{
    title: 'All',
    redirectTo: '',
    defaultActive: true,
  }, {
    title: 'Favorites',
    redirectTo: 'favorites',
    icon: 'favorite'
  }, {
    title: 'Important',
    redirectTo: 'important',
    icon: 'assignment_late'
  }]
}