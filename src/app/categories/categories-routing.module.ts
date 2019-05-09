import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { CategoriesTreeComponent } from './categories-tree/categories-tree.component';

const routes: Routes = [{
  path: '',
  component: CategoriesComponent,
  children: [{
    path: 'tree',
    component: CategoriesTreeComponent
  }, {
    path: '',
    redirectTo: 'tree',
    pathMatch: 'full'
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }