import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/shared/models';
import { MatBottomSheet } from '@angular/material';
import { CategoryManagementComponent } from '../category-management/category-management.component';
import { CategoriesService } from '../services/categories.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories-tree',
  templateUrl: './categories-tree.component.html',
  styleUrls: ['./categories-tree.component.scss']
})
export class CategoriesTreeComponent implements OnInit {
  categories: Category[] = [{
    name: 'Category 1',
    children: [{
      name: 'Category 1.1',
    }, {
      name: 'Category 1.2',
      children: [{
        name: 'Category 1.2.1'
      }, {
        name: 'Category 1.2.2'
      }]
    }, {
      name: 'Category 1.3'
    }]
  }, {
    name: 'Category 2',
  }, {
    name: 'Category 3',
    children: [{
      name: 'Category 3.1',
    }, {
      name: 'Category 3.2'
    }]
  }];
  
  constructor(
    private bottomSheet: MatBottomSheet,
    
  ) { }

  ngOnInit() {
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
        this.categories = [...this.categories, category];
      })
  }

}
