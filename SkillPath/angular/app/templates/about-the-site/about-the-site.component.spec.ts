import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutTheSiteComponent } from './about-the-site.component';

describe('AboutTheSiteComponent', () => {
  let component: AboutTheSiteComponent;
  let fixture: ComponentFixture<AboutTheSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutTheSiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutTheSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
