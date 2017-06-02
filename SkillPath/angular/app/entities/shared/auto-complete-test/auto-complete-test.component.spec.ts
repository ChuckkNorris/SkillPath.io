import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoCompleteTestComponent } from './auto-complete-test.component';

describe('AutoCompleteTestComponent', () => {
  let component: AutoCompleteTestComponent;
  let fixture: ComponentFixture<AutoCompleteTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoCompleteTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoCompleteTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
