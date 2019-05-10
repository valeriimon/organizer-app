import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar-list',
  templateUrl: './sidebar-list.component.html',
  styleUrls: ['./sidebar-list.component.scss']
})
export class SidebarListComponent implements OnInit {
  activeSidebars: any[] = [];
  unsubSubj: Subject<any> = new Subject();
  constructor(
    private sidebarService: SidebarService
  ) { }

  ngOnInit() {
    this.sidebarService.subToActivateSidebarsWatcher()
      .pipe(
        takeUntil(this.unsubSubj),
        debounceTime(0)
      )
      .subscribe((v) => {
        this.activeSidebars = Array.from(this.sidebarService.activeSidebars).map(sidebarName => {
          return {
            name: sidebarName,
            title: this.sidebarService[sidebarName].sidebarTitle
          }
        });
      })
  }

  onItemClicked(sidebar: {name: string, title: string}) {
    this.sidebarService.makeSidebarFocused(sidebar.name);
  }

  closeSidebar(sidebar: {name: string, title: string}) {
    this.sidebarService.closeSidebar(sidebar.name);
  }

}
