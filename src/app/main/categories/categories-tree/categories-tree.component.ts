import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/models';
import { MatBottomSheet } from '@angular/material';
import { CategoryManagementComponent } from '../category-management/category-management.component';
import { CategoriesService } from '../services/categories.service';
import { Observable, Subject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-categories-tree',
  templateUrl: './categories-tree.component.html',
  styleUrls: ['./categories-tree.component.scss']
})
export class CategoriesTreeComponent implements OnInit {
  categories: Category[] = []
  unsubSubject$: Subject<void> = new Subject();
  constructor(
    private bottomSheet: MatBottomSheet,
    private categoriesService: CategoriesService  
  ) { }

  ngOnDestroy() {
    this.unsubSubject$.next();
  }

  ngOnInit() {
    this.categoriesService.onCategories()
      .pipe(
        takeUntil(this.unsubSubject$)
      )
      .subscribe(res => {
        this.categories = res;
      })
    this.getCategories();
  }

  getCategories() {
    this.categoriesService.fetchCategories().subscribe()
  }

  addCategory() {
    const sheetRef = this.bottomSheet.open(CategoryManagementComponent, {
      data: {
        manageType: 'Add'
      },
      hasBackdrop: false
    });

    sheetRef.afterDismissed()
      .subscribe((category: Category) => {
        if(!category) return
        this.categoriesService.createCategory(category)
          .pipe(
            takeUntil(this.unsubSubject$),
            tap(() => this.getCategories())
          )
          .subscribe()
      })
  }

}
