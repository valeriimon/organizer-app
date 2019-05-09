import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { TabsComponent } from './components/tabs/tabs.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarService } from './services/sidebar.service';
import { ColorSelectorComponent } from './components/color-selector/color-selector.component';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [TabsComponent, SidebarComponent, ColorSelectorComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    CKEditorModule
  ],
  providers: [
    SidebarService
  ],
  exports: [
    MaterialModule,
    FormsModule,
    CKEditorModule,
    TabsComponent,
    SidebarComponent,
    ColorSelectorComponent
  ]
})
export class SharedModule {
}
