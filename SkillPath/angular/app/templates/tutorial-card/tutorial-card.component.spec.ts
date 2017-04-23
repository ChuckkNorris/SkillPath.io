import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialCardComponent } from './tutorial-card.component';

describe('TutorialCardComponent', () => {
  let component: TutorialCardComponent;
  let fixture: ComponentFixture<TutorialCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TutorialCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorialCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
