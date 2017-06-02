import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitTutorialFormComponent } from './submit-tutorial-form.component';

describe('SubmitTutorialFormComponent', () => {
  let component: SubmitTutorialFormComponent;
  let fixture: ComponentFixture<SubmitTutorialFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitTutorialFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitTutorialFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
