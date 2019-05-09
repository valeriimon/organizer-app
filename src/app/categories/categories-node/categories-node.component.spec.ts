import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesNodeComponent } from './categories-node.component';

describe('CategoriesNodeComponent', () => {
  let component: CategoriesNodeComponent;
  let fixture: ComponentFixture<CategoriesNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
