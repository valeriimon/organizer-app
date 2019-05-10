import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Subject } from 'rxjs';
import { Category } from 'src/app/shared/models';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-selected-categories',
  templateUrl: './selected-categories.component.html',
  styleUrls: ['./selected-categories.component.scss']
})
export class SelectedCategoriesComponent implements OnInit {
  selectedCategories: Category[] = [];
  unsubSubject: Subject<void> = new Subject();
  constructor(
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.categoriesService.subToSelectedCategories()
      .pipe(takeUntil(this.unsubSubject))
      .subscribe((cats) => this.selectedCategories = cats);
  }
  
  removeCategory(catName: string) {
    this.categoriesService.removeSelectedCategory({name: catName});
  }

}
