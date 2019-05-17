import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/shared/models';
import { TagsService } from '../services/tags.service';
import { MatBottomSheet } from '@angular/material';
import { TagManagementComponent } from '../tag-management/tag-management.component';
import { Subject, Observable } from 'rxjs';
import { takeUntil, distinctUntilChanged, debounceTime, tap } from 'rxjs/operators';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent implements OnInit {
  tags$: Observable<Tag[]>;
  lastSearch: string = '';
  searchSubject: Subject<string> = new Subject();
  unsubSubject$: Subject<void> = new Subject();

  constructor(
    private tagsService: TagsService,
    private bottomSheet: MatBottomSheet,
  ) { }

  ngOnDestroy() {
    this.unsubSubject$.next();
  }

  ngOnInit() {
    this.tags$ = this.tagsService.onTags();
    this.searchSubject
      .pipe(
        takeUntil(this.unsubSubject$),
        distinctUntilChanged(),
        debounceTime(500)
      )
      .subscribe(keyword => this.getTags({keyword}))

    this.getTags();
  }

  getTags(query: {keyword?: string} = {}) {
    this.tagsService.fetchTags(query).subscribe();
  }

  onSearch(v: string) {
    this.searchSubject.next(v);
  }

  manageTag(ev: Event, tag:Tag, manageType: 'Add' | 'Edit') {
    ev.stopPropagation();
    const sheetRef = this.bottomSheet.open(TagManagementComponent, {
      data: {
        name: tag.name,
        icon: tag.icon,
        manageType
      },
      hasBackdrop: false
    });

    sheetRef.afterDismissed()
      .pipe(takeUntil(this.unsubSubject$))
      .subscribe((changedTag: Tag) => {
        if(!changedTag) return
        
        if(manageType === 'Add') {
          this.tagsService.createTag(changedTag)
            .pipe(
              takeUntil(this.unsubSubject$),
              tap(() => this.getTags())
            )
            .subscribe()
          
          return
        }

        this.tagsService.updateTag({...tag, ...changedTag})
          .pipe(
            takeUntil(this.unsubSubject$),
            tap(() => this.getTags())
          )
          .subscribe();
      })
  }

  selected(tag: Tag) {
    this.tagsService.registerSelectedTags([tag]);
  }

  removeTag(ev: Event, tagId: string) {
    ev.stopPropagation();
    this.tagsService.removeTag(tagId)
      .pipe(
        takeUntil(this.unsubSubject$),
        tap(() => this.getTags())
      )
      .subscribe()
  }

}
