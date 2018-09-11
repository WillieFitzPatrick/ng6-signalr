import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttrBindingsComponent } from './attr-bindings.component';

describe('AttrBindingsComponent', () => {
  let component: AttrBindingsComponent;
  let fixture: ComponentFixture<AttrBindingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttrBindingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttrBindingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
