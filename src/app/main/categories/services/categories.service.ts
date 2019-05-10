import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { share } from 'rxjs/operators';
import { Category } from 'src/app/shared/models';

@Injectable()
export class CategoriesService {
  private _selectedCategories: Category[] = [];
  selectedCategories$: Subject<Category[]> = new Subject();
  constructor() { }

  subToSelectedCategories() {
    return this.selectedCategories$.pipe(share());
  }

  registerSelectedCategories(categories: Category[]) {
    categories = categories.filter(category => {
      return this._selectedCategories.findIndex(cat => cat.name === category.name) < 0
    })
    this._selectedCategories = [...this._selectedCategories, ...categories];
    this.selectedCategories$.next(this._selectedCategories);
  }

  removeSelectedCategory(category: Category) {
    this._selectedCategories = this._selectedCategories
      .filter(cat => cat.name !== category.name);
      
    this.selectedCategories$.next(this._selectedCategories);
  }
}
