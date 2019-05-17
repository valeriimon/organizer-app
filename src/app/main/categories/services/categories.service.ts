import { Injectable } from '@angular/core';
import { Subject, Observable, of, BehaviorSubject } from 'rxjs';
import { share, map, mapTo, tap } from 'rxjs/operators';
import { Category } from 'src/app/shared/models';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  var1: string
  categories$: BehaviorSubject<Category[]> = new BehaviorSubject([]);
  private _selectedCategories: Category[] = [];
  selectedCategories$: Subject<Category[]> = new Subject();
  constructor(
    private http: HttpClient
  ) { }

  subToSelectedCategories() {
    return this.selectedCategories$.pipe(share());
  }

  onCategories() {
    return this.categories$.pipe(share())
  }

  registerSelectedCategories(categories: Category[]) {
    categories = categories.filter(category => {
      return this._selectedCategories.findIndex(cat => cat.name === category.name) < 0
    })
    this._selectedCategories = [...this._selectedCategories, ...categories];
    this.selectedCategories$.next(this._selectedCategories);
  }

  clearSelectedCats() {
    this._selectedCategories = [];
    this.selectedCategories$.next([]);
  }

  removeSelectedCategory(category: Category) {
    this._selectedCategories = this._selectedCategories
      .filter(cat => cat.name !== category.name);
      
    this.selectedCategories$.next(this._selectedCategories);
  }

  fetchCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('api/categories')
      .pipe(
        map(this.mapCategories.bind(this)),
        tap((cats: Category[]) => {
          this.categories$.next(cats)
        })
      );
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>('api/categories', category)
  }

  updateCategory(category: Partial<Category>) {
    return this.http.put('api/categories', category)
  }

  removeCategory(categoryId: string) {
    return this.http.delete(`api/categories/${categoryId}`)
  }

  mapCategories(cats: Category[]): Category[] {
    return cats.map(cat => {
      cat.children = this.groupBy(cat.id, cats);
      if(cat.children.length) {
        this.mapCategories(cat.children)
      }
      
      return cat.parent ? undefined : cat;
    }).filter(Boolean)
  }

  groupBy(catId, cats: Category[]) {
    return cats.filter(c => c.parent === catId)
  }
}
