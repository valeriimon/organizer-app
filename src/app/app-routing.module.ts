import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [{
  path: 'categories',
  loadChildren: './categories/categories.module#CategoriesModule'
}, {
  path: 'notes',
  loadChildren: './notes/notes.module#NotesModule'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
