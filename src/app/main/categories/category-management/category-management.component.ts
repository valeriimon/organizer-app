import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { Category } from 'src/app/shared/models';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.scss']
})
export class CategoryManagementComponent implements OnInit {
  categoryName: string = '';
  manageType: 'Add' | 'Edit';
  constructor(
    private bottomSheetRef: MatBottomSheetRef<CategoryManagementComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {name: string, manageType: 'Add' | 'Edit'}
  ) { }

  ngOnInit() {
    this.checkManagementState()
  }

  checkManagementState() {
    this.manageType = this.data.manageType;
    if(this.data.manageType === 'Edit') {
      this.categoryName = this.data.name;
    }
  }

  onDismiss(trigger: string) {
    let data: Category;
    if(trigger === 'submit') {
      data = {
        name: this.categoryName,
        children: []
      }
    }

    this.bottomSheetRef.dismiss(data);
  }

}
