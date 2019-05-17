import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';
import { Tag } from 'src/app/shared/models';

@Component({
  selector: 'app-tag-management',
  templateUrl: './tag-management.component.html',
  styleUrls: ['./tag-management.component.scss']
})
export class TagManagementComponent implements OnInit {
  tagName: string = '';
  tagIcon: string = '';
  manageType: 'Add' | 'Edit';
  constructor(
    private bottomSheetRef: MatBottomSheetRef<TagManagementComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {name: string, manageType: 'Add' | 'Edit', icon?: string}
  ) { }

  ngOnInit() {
    this.checkManagementState()
  }

  checkManagementState() {
    this.manageType = this.data.manageType;
    if(this.data.manageType === 'Edit') {
      this.tagName = this.data.name;
      this.tagIcon = this.data.icon;
    }
  }

  onDismiss(trigger: string) {
    let data: Tag;
    if(trigger === 'submit') {
      data = {
        name: this.tagName,
        icon: this.tagIcon,
      }
    }

    this.bottomSheetRef.dismiss(data);
  }
}
