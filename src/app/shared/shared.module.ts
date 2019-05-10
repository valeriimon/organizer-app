import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { TabsComponent } from './components/tabs/tabs.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ColorSelectorComponent } from './components/color-selector/color-selector.component';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SidebarListComponent } from './components/sidebar-list/sidebar-list.component';

@NgModule({
  declarations: [TabsComponent, SidebarComponent, ColorSelectorComponent, SidebarListComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    CKEditorModule
  ],
  exports: [
    MaterialModule,
    FormsModule,
    CKEditorModule,
    TabsComponent,
    SidebarComponent,
    SidebarListComponent,
    ColorSelectorComponent
  ]
})
export class SharedModule {
}
