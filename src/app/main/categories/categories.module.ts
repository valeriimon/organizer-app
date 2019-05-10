import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { CategoriesTreeComponent } from './categories-tree/categories-tree.component';
import { CategoriesNodeComponent } from './categories-node/categories-node.component';
import { SharedModule } from '../../shared/shared.module';
import { CategoryManagementComponent } from './category-management/category-management.component';
import { CategoriesService } from './services/categories.service';

@NgModule({
  declarations: [
    CategoriesComponent,
    CategoriesTreeComponent,
    CategoriesNodeComponent,
    CategoryManagementComponent,
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule
  ],
  entryComponents: [
    CategoryManagementComponent
  ],
  providers: [CategoriesService],
  exports: [
    CategoriesTreeComponent,
    CategoriesNodeComponent,
  ]
})
export class CategoriesModule { }
