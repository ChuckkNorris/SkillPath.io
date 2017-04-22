import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitTutorialPageComponent } from './submit-tutorial-page.component';

describe('SubmitTutorialPageComponent', () => {
  let component: SubmitTutorialPageComponent;
  let fixture: ComponentFixture<SubmitTutorialPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitTutorialPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitTutorialPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
