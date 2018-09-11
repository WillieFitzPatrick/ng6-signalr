import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwToolbarComponent } from './sw-toolbar.component';

describe('SwToolbarComponent', () => {
  let component: SwToolbarComponent;
  let fixture: ComponentFixture<SwToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
