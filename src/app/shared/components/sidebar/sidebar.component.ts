import { Component, OnInit, Input, HostBinding, HostListener, Inject, forwardRef, Optional, ChangeDetectorRef } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { AnimationBuilder, trigger, transition, query, animate, style, state } from '@angular/animations';
import { Subject } from 'rxjs';
import { takeUntil, skipWhile, tap, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('sideBarOnToggle', [

      state('true', style({
        transform: 'translateX( 0 )'
      }), {params: {width: '0px'}}),

      state('*', style({
        transform: 'translateX({{operator}}{{ width }})'
      }), {params: {width: '0px', operator: ''}}),

      transition('* <=> true', animate('0.3s ease-in'))
    ])
  ]
})
export class SidebarComponent implements OnInit {
  isOpen: boolean = false;
  needBlur: boolean = false;
  unsubSubject: Subject<boolean> = new Subject();
  @Input() sidebarTitle: string = ''
  @Input() name: string = '';
  @Input() allowMulti: boolean = true;
  
  @Input() 
  set position(v: 'left' | 'right') {
    this._position = v;
  }
  
  get position() {
    return this._position;
  }
  
  private _position: 'left' | 'right' = 'right';
  private _positionOperator: string = '';
  
  
  @HostBinding('style.width')
  @Input() 
  width: string = '300px';
  
  @HostBinding('style.zIndex') 
  zIndex: number = 1000;
  
  @HostBinding('style.right')
  get positionRight() {
    return this.position === 'right' ? '0' : 'unset';
  }
  
  @HostBinding('style.left')
  get positionLeft() {
    return this.position === 'left' ? '0' : 'unset';
  }

  @HostBinding('style.opacity')
  get blur() {
    return this.needBlur ? '.6' : '1';
  }
  @HostBinding('@sideBarOnToggle')
  get toggleAnimationState() {
    return {
      value: this.sidebarService.activeSidebars.has(this.name),
      params: {
        width: this.width,
        operator: this._positionOperator
      },
    }
  }

  @HostListener('click', ['$event'])
  selfClicked() {
    this.sidebarService.makeSidebarFocused(this.name);
  }
  
  constructor(
    @Optional() @Inject(forwardRef(() => SidebarService)) private sidebarService: SidebarService,
  ) {  }

  ngOnDestroy() {
    this.unsubSubject.next();
    this.sidebarService.closeSidebar(this.name);
  }

  ngOnInit() {
    this.sidebarService.registerSidebar(this.name, this);
    this.subToActiveSidebars();
    this.subToFocusedSidebar();
    console.log(this.name, this.sidebarTitle);
  }

  setPositionOperator(v) {
    switch(v) {
      case 'left': {
        this._positionOperator = '-';
        break;
      }
      case 'right': {
        this._positionOperator = '+';
        break;
      }
    }
  }

  subToActiveSidebars() {
    this.sidebarService.subToActivateSidebarsWatcher()
      .pipe(
        takeUntil(this.unsubSubject),
        skipWhile((data) => data.sidebarName !== this.name),
      )
      .subscribe(() => {
        this.isOpen = this.sidebarService.activeSidebars.has(this.name);
      })
  }

  subToFocusedSidebar() {
    this.sidebarService.subToFocusedSidebarWatcher()
      .pipe(
        takeUntil(this.unsubSubject),
      )
      .subscribe(({zIndex, sidebarName}) => {
        this.needBlur = this.name !== sidebarName;
        this.zIndex = this.name !== sidebarName ? this.zIndex : zIndex;
      })
  } 

  // Change Component properties manualy by method to avoid side effects
  changeSidebarOptions(options) {
    for(let opt in options) {
      this[opt] = options[opt];
    }
  }

  open(options: {position?: 'left' | 'right'} = {}) {
    if(options.position) {
      this.position = options.position;
    }
    this.setPositionOperator(this.position);
    // TODO: sync this thing
    setTimeout(() => {
      this.sidebarService.openSidebar(this.name);
    }, 0); 
  }

  close() {
    this.needBlur = false;
    this.sidebarService.closeSidebar(this.name);
  }

}
