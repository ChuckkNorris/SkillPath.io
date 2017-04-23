import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachPageComponent } from './teach-page.component';

describe('TeachPageComponent', () => {
  let component: TeachPageComponent;
  let fixture: ComponentFixture<TeachPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
