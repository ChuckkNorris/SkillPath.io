import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialCategoriesComponent } from './tutorial-categories.component';

describe('TutorialCategoriesComponent', () => {
  let component: TutorialCategoriesComponent;
  let fixture: ComponentFixture<TutorialCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorialCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
