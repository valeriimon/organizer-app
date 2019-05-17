import { Injectable } from '@angular/core';
import { Tag } from 'src/app/shared/models';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { share, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TagsService {
  tags$: BehaviorSubject<Tag[]> = new BehaviorSubject([]);
  private _selectedTags: Tag[] = [];
  selectedTags$: Subject<Tag[]> = new Subject();
  constructor(
    private http: HttpClient
  ) { }

  onTags(): Observable<Tag[]> {
    return this.tags$.pipe(share());
  }

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

  clearSelectedTags() {
    this._selectedTags = [];
    this.selectedTags$.next([]);
  }

  fetchTags(query?: {keyword?: string}): Observable<Tag[]> {
    const options: any = {
      params: query
    };
    
    return this.http.get<Tag[]>('api/tags', options)
      .pipe(
        (tap((tags: Tag[]) => this.tags$.next(tags)) as any)
      );
  }

  removeSelectedTag(tag: Tag) {
    this._selectedTags = this._selectedTags
      .filter(t => t.name !== tag.name);
      
    this.selectedTags$.next(this._selectedTags);
  }

  createTag(tag: Tag): Observable<Tag> {
    return this.http.post<Tag>('api/tags', tag)
  }

  updateTag(tag: Partial<Tag>) {
    return this.http.put('api/tags', tag)
  }

  removeTag(tagId: string) {
    return this.http.delete(`api/tags/${tagId}`)
  }
}
