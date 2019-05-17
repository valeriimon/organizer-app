import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Note, Category, Tag } from 'src/app/shared/models';
import { SidebarService } from 'src/app/shared/services/sidebar.service';
import { CategoriesService } from '../../categories/services/categories.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TagsService } from '../../tags/services/tags.service';

@Component({
  selector: 'app-note-management',
  templateUrl: './note-management.component.html',
  styleUrls: ['./note-management.component.scss']
})
export class NoteManagementComponent implements OnInit, OnDestroy {
  @Input() 
  set note(v: Note) {
    this._note = {...v};
  }

  get note(): Note {
    return this._note;
  }

  @Output() 
  onSubmit: EventEmitter<Note> = new EventEmitter();

  unsubSubject$: Subject<void> = new Subject();
  _note: Note = {
    name: '',
    text: '',
    color: ''
  }
  
  editorData: string;
  Editor = ClassicEditor;

  constructor(
    private sidebarService: SidebarService,
    private categoriesService: CategoriesService,
    private tagsService: TagsService
  ) { }

  ngOnDestroy() {
    this.unsubSubject$.next();
  }

  ngOnInit() {
    this.categoriesService.subToSelectedCategories()
      .pipe(takeUntil(this.unsubSubject$))
      .subscribe((categories: Category[]) => {
        this.note.categories = categories
      })

    this.tagsService.subToSelectedTags()
      .pipe(takeUntil(this.unsubSubject$))
      .subscribe((tags: Tag[]) => {
        this.note.tags = tags;
      })
  }

  openCategories() {
    this.sidebarService['categories'].open({
      position: 'left',
    })
  }

  openTags() {
    this.sidebarService['tags'].open({
      position: 'left',
    })
  }

  removeCategory(cat: Category) {
    this.categoriesService.removeSelectedCategory(cat);
  }

  removeTag(tag: Tag) {
    this.tagsService.removeSelectedTag(tag);
  }

  submit() {
    this.onSubmit.emit(this.note);
    this.tagsService.clearSelectedTags();
    this.categoriesService.clearSelectedCats()
  }

}
