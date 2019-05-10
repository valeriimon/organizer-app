import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteManagementComponent } from './note-management.component';

describe('NoteManagementComponent', () => {
  let component: NoteManagementComponent;
  let fixture: ComponentFixture<NoteManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
