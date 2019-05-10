import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagListComponent } from './tag-list/tag-list.component';
import { TagsService } from './services/tags.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { TagManagementComponent } from './tag-management/tag-management.component';

@NgModule({
  declarations: [TagListComponent, TagManagementComponent],
  imports: [
    CommonModule,
    SharedModule,
  ],
  entryComponents: [TagManagementComponent],
  providers: [TagsService],
  exports: [TagListComponent]
})
export class TagsModule { }
