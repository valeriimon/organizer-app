import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [{
  path: '',
  component: MainComponent,
  children: [{
    path: 'categories',
    loadChildren: './categories/categories.module#CategoriesModule'
  }, {
    path: 'notes',
    loadChildren: './notes/notes.module#NotesModule'
  }, {
    path: '',
    redirectTo: 'notes',
    pathMatch: 'full'
  }]
}, ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }