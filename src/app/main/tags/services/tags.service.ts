import { Injectable } from '@angular/core';
import { Tag } from 'src/app/shared/models';
import { Subject } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable()
export class TagsService {
  private _selectedTags: Tag[] = [];
  selectedTags$: Subject<Tag[]> = new Subject();
  constructor() { }

  subToSelectedTags() {
    return this.selectedTags$.pipe(share());
  }

  registerSelectedTags(tags: Tag[]) {
    tags = tags.filter(tag => {
      return this._selectedTags.findIndex(t => t.name === tag.name) < 0
    })
    this._selectedTags = [...this._selectedTags, ...tags];
    this.selectedTags$.next(this._selectedTags);
  }

  removeSelectedTag(tag: Tag) {
    this._selectedTags = this._selectedTags
      .filter(t => t.name !== tag.name);
      
    this.selectedTags$.next(this._selectedTags);
  }
}
