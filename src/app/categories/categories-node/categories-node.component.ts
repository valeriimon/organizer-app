import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/shared/models';
import { MatBottomSheet } from '@angular/material';
import { CategoryManagementComponent } from '../category-management/category-management.component';

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
    private bottomSheet: MatBottomSheet
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
          this.category.children = (this.category.children || []).concat([category]);
          return
        }

        this.category.name = category.name
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
      /* magic is done here */
      this.category.children = this.category.children
        .filter(category => category.name !== data.category.name)
    }
  }

}
