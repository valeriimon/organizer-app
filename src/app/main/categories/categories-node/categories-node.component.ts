import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/shared/models';
import { MatBottomSheet } from '@angular/material';
import { CategoryManagementComponent } from '../category-management/category-management.component';
import { CategoriesService } from '../services/categories.service';
import { tap, subscribeOn } from 'rxjs/operators';

@Component({
  selector: 'app-categories-node',
  templateUrl: './categories-node.component.html',
  styleUrls: ['./categories-node.component.scss']
})
export class CategoriesNodeComponent implements OnInit {
  @Input() category: Category = {
    name: '',
    children: []
  }
  @Input() parentCategory: Category;
  @Input() rootCategory: boolean;
  
  @Output('onEvent') 
  onEventEmitter: EventEmitter<{event: string, category: Category}> = new EventEmitter(); 
  
  constructor(
    private bottomSheet: MatBottomSheet,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.bottomSheet.dismiss();
  }

  manageCategory(manageType: 'Add' | 'Edit') {
    const sheetRef = this.bottomSheet.open(CategoryManagementComponent, {
      data: {
        name: this.category.name,
        manageType
      },
      hasBackdrop: false
    });

    sheetRef.afterDismissed()
      .subscribe((category: Category) => {
        if(!category) return
        
        if(manageType === 'Add') {
          category.parent = this.category.id;
          this.categoriesService.createCategory(category)
            .pipe(
              tap(() => this.categoriesService.fetchCategories().subscribe())
            )
            .subscribe()

          return
        }

        this.categoriesService.updateCategory({...this.category, ...category})
          .pipe(
            tap(() => this.categoriesService.fetchCategories().subscribe())
          )
          .subscribe()
      })
  }

  emitRemoveCategoryEvent() {
    this.onEventEmitter.emit({
      event: 'remove',
      category: this.category
    })
  }

  onChildEvent(data: {event: string, category: Category}) {
    if(data.event === 'remove') {
      this.categoriesService.removeCategory(data.category.id)
        .pipe(
          tap(() => this.categoriesService.fetchCategories().subscribe())
        )
        .subscribe()
    }
  }

  onSelect() {
    this.categoriesService.registerSelectedCategories([this.category]);
  }

}
