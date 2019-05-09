import { Component, OnInit, Input, Output } from '@angular/core';
import { Tab } from '../../models';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  @Input() tabList: Tab[] = [];

  constructor() { }

  ngOnInit() {
  }

}
