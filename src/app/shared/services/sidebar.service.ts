import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { SidebarComponent } from '../components/sidebar/sidebar.component';

@Injectable()
export class SidebarService {
  zIndex: string = ''
  activeSidebars: Set<string> = new Set();
  activeSidebarsWatcher: Subject<string> = new Subject();
  constructor() { 
    this.activateSidebarsWatcher();
  }

  activateSidebarsWatcher() {
    this.activeSidebarsWatcher
      .pipe(
        distinctUntilChanged((oldValue: string, newValue: string) => 
          (oldValue === newValue && this.activeSidebars.has(newValue))
        ),
        tap((sidebar: string) => {
          if(!this[sidebar].allowMulti) {
            this.activeSidebars.clear();
          }

          const lastOpenedSideBar: string = Array.from(this.activeSidebars)[this.activeSidebars.size - 1];
          if(lastOpenedSideBar) {
            this[sidebar].zIndex = (+this[lastOpenedSideBar].zIndex + 1).toString();
          }
        }),
        debounceTime(500)
      )
      .subscribe((sidebar) => {
        this.activeSidebars.add(sidebar);
        console.log(this.activeSidebars);
      })
  }

  registerSidebar(sidebarName: string, SidebarComponent: SidebarComponent) {
    this[sidebarName] = SidebarComponent;
  }

  openSidebar(sidebarName: string) {
    this.activeSidebarsWatcher.next(sidebarName);
  }

  closeSidebar(sidebarName: string) {
    this.activeSidebars.delete(sidebarName);
  }
}
