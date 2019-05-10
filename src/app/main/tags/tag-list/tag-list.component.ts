import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/shared/models';
import { TagsService } from '../services/tags.service';
import { MatBottomSheet } from '@angular/material';
import { TagManagementComponent } from '../tag-management/tag-management.component';
import { Subject } from 'rxjs';
import { takeUntil, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { generatetKey } from 'src/utils/common-utils';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent implements OnInit {
  tags: Tag[] = [{
    name: 'Important',
    icon: 'label_important',
    key: generatetKey('tag')
  }, {
    name: 'Favorite',
    icon: 'favorites',
    key: generatetKey('tag')
  },];

  private _filteredTags: Tag[] = [];

  lastSearch: string = '';
  searchSubject: Subject<string> = new Subject();
  unsubSubject: Subject<void> = new Subject();

  constructor(
    private tagsService: TagsService,
    private bottomSheet: MatBottomSheet,
  ) { }

  ngOnInit() {
    this._filteredTags = this.tags;
    this.searchSubject
      .pipe(
        takeUntil(this.unsubSubject),
        distinctUntilChanged(),
        debounceTime(500)
      )
      .subscribe(this.makeSearch.bind(this))
  }

  onSearch(v: string) {
    this.searchSubject.next(v);
  }

  makeSearch(v: string) {
    this.lastSearch = v;
    this._filteredTags = this.tags
      .filter(t => (!v && true) || t.name.toLocaleLowerCase().search(v.toLocaleLowerCase()) >= 0);
  }

  manageTag(ev: Event, tag:Tag, manageType: 'Add' | 'Edit') {
    ev.stopPropagation();
    const sheetRef = this.bottomSheet.open(TagManagementComponent, {
      data: {
        name: tag.name,
        icon: tag.icon,
        key: tag.key,
        manageType
      },
      hasBackdrop: false
    });

    sheetRef.afterDismissed()
      .pipe(takeUntil(this.unsubSubject))
      .subscribe((tag: Tag) => {
        if(!tag) return
        
        if(manageType === 'Add') {
          this.tags = (this.tags || []).concat([tag]);
        } else {
          this.tags = this.tags.map(t => {
            if(t.key === tag.key) {
              return tag
            }
            return t;
          })
        }
        this.makeSearch(this.lastSearch);
      })
  }

  selected(tag: Tag) {
    this.tagsService.registerSelectedTags([tag]);
  }

  removeTag(ev: Event, tag: Tag) {
    ev.stopPropagation();
    this.tags = this.tags.filter(t => t.name !== tag.name);
    this.makeSearch(this.lastSearch);
  }

}
