import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { tap, distinctUntilChanged, share, subscribeOn, debounceTime } from 'rxjs/operators';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { SharedModule } from '../shared.module';


/**
 * Warnings: Circular Dependency with components in this module due to using 'providedIn'
 */
@Injectable({
  providedIn: SharedModule
})
export class SidebarService {
  activeSidebars: Set<string> = new Set();
  
  private activeSidebarsWatcher$: BehaviorSubject<{open?: boolean, sidebarName?: string}> = new BehaviorSubject({});

  private focusedSidebarWatcher$: BehaviorSubject<{zIndex?: number, sidebarName?: string}> = new BehaviorSubject({});

  constructor() { 
    this.regActivateSidebarsWatcher();
  }

  regActivateSidebarsWatcher() {
    this.activeSidebarsWatcher$
      .pipe(
        distinctUntilChanged(({open: oldStatus, sidebarName: oldValue}, {open: newStatus, sidebarName: newValue}) => 
          (oldValue === newValue && oldStatus === newStatus)
        ),
        tap(({open, sidebarName}) => {
          if(!this[sidebarName]) return
          if(open) {
            if(!this[sidebarName].allowMulti) {
              this.activeSidebars.clear();
            }
  
            this.makeSidebarFocused(sidebarName);
  
            this.activeSidebars.add(sidebarName);
            return
          }
          

          this.activeSidebars.delete(sidebarName);
        }),
      ).subscribe();
  }

  subToActivateSidebarsWatcher() {
    return this.activeSidebarsWatcher$.pipe(share());
  }

  subToFocusedSidebarWatcher() {
    return this.focusedSidebarWatcher$.pipe(share());
  }

  makeSidebarFocused(sidebarName: string) {
    const sidebars = Array.from(this.activeSidebars);
    let zIndex: number = 0;
    for(let sidebarName of sidebars) {
      const sidebar = this[sidebarName] as SidebarComponent;
      if(sidebar.zIndex > zIndex) {
        zIndex = sidebar.zIndex;
      }
    }
    this.focusedSidebarWatcher$.next({
      zIndex: zIndex ? zIndex + 1 : 1000,
      sidebarName
    })
  }

  registerSidebar(sidebarName: string, SidebarComponent: SidebarComponent) {
    this[sidebarName] = SidebarComponent;
  }

  openSidebar(sidebarName: string, options?: {position?: string, width?: string}) {
    if(!this[sidebarName]) return
    if(options) {
      (this[sidebarName] as SidebarComponent).changeSidebarOptions(options);
    }
    this.activeSidebarsWatcher$.next({
      open: true,
      sidebarName
    });
  }

  closeSidebar(sidebarName: string) {
    this.activeSidebarsWatcher$.next({
      open: false,
      sidebarName
    })
  }
}
