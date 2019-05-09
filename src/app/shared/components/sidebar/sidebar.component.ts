import { Component, OnInit, Input, HostBinding, HostListener } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { AnimationBuilder, trigger, transition, query, animate, style, state } from '@angular/animations';

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
        transform: 'translateX({{ width }})'
      }), {params: {width: '0px'}}),

      transition('* <=> true', animate('0.3s ease-in'))
    ])
  ]
})
export class SidebarComponent implements OnInit {
  isOpen: boolean = false;
  @Input() name: string = '';
  @Input() position: 'left' | 'right' = 'right';
  @Input() allowMulti: boolean = true;
  
  @HostBinding('style.width')
  @Input()
  width: string = '300px';

  @HostBinding('@sideBarOnToggle')
  get toggleAnimationState() {
    return {
      value: this.sidebarService.activeSidebars.has(this.name),
      params: {
        width: this.width
      },
    }
  }

  @HostListener('@sideBarOnToggle.done', ['$event', 'data'])
  toggleAnimationStart(ev, data) {
    console.log(ev, data);
    
  }

  @HostBinding('style.zIndex') zIndex: string = '1000';
  
  @HostBinding('style.right')
  get positionRight() {
    return this.position === 'right' && '0';
  }
  
  @HostBinding('style.left')
  get positionLeft() {
    return this.position === 'left' && '0';
  }
  
  constructor(
    private sidebarService: SidebarService,
  ) {
    
  }

  ngOnInit() {
    this.sidebarService.registerSidebar(this.name, this);
  }

  ngOnChanges() {
    console.log(1);
    // this.isOpen = this.sidebarService.activeSidebars.has(this.name)
  }

  open() {
    this.sidebarService.openSidebar(this.name);
  }

  close() {
    this.sidebarService.closeSidebar(this.name);
  }

}
