import { NgModule, ModuleWithProviders, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ColorSelectorComponent } from './components/color-selector/color-selector.component';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SidebarListComponent } from './components/sidebar-list/sidebar-list.component';
import { DataService } from './services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { CategoriesTreeComponent } from '../main/categories/categories-tree/categories-tree.component';
import { CategoriesNodeComponent } from '../main/categories/categories-node/categories-node.component';
import { CategoryManagementComponent } from '../main/categories/category-management/category-management.component';

@NgModule({
  declarations: [
    SidebarComponent, 
    ColorSelectorComponent, 
    SidebarListComponent, 
    CategoriesTreeComponent, 
    CategoriesNodeComponent,
    CategoryManagementComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    CKEditorModule,
    HttpClientInMemoryWebApiModule.forFeature(DataService)
  ],
  entryComponents: [CategoryManagementComponent],
  exports: [
    MaterialModule,
    FormsModule,
    HttpClientModule,
    CKEditorModule,
    SidebarComponent,
    SidebarListComponent,
    ColorSelectorComponent,
    CategoriesTreeComponent,
    CategoriesNodeComponent,
    CategoryManagementComponent
  ]
})
export class SharedModule {
}
