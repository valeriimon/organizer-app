import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteShortDetailsComponent } from './note-short-details.component';

describe('NoteShortDetailsComponent', () => {
  let component: NoteShortDetailsComponent;
  let fixture: ComponentFixture<NoteShortDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteShortDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteShortDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
