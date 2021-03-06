import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatSidenavModule,
  MatToolbarModule,
  MatExpansionModule,
  MatIconModule,
  MatListModule,
  MatButtonModule,
  MatTooltipModule,
  MatPaginatorModule,
  MatMenuModule,
  MatCardModule,
  MatSelectModule,
  MatFormFieldModule,
  MatBottomSheetModule,
  MatInputModule,
  MatCheckboxModule,
  MatChipsModule
} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatMenuModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatBottomSheetModule,
    MatInputModule,
    MatCheckboxModule,
    MatChipsModule
  ],
  exports: [
    MatSidenavModule,
    MatToolbarModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatMenuModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatBottomSheetModule,
    MatInputModule,
    MatCheckboxModule,
    MatChipsModule
  ]
})
export class MaterialModule { }
