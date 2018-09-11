import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LzcomponentComponent } from './lzcomponent.component';

describe('LzcomponentComponent', () => {
  let component: LzcomponentComponent;
  let fixture: ComponentFixture<LzcomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LzcomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LzcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
