import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseTutorialsPageComponent } from './browse-tutorials-page.component';

describe('BrowseTutorialsPageComponent', () => {
  let component: BrowseTutorialsPageComponent;
  let fixture: ComponentFixture<BrowseTutorialsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseTutorialsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseTutorialsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
