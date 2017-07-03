import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySearchItemComponent } from './category-search-item.component';

describe('CategorySearchItemComponent', () => {
  let component: CategorySearchItemComponent;
  let fixture: ComponentFixture<CategorySearchItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorySearchItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorySearchItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
