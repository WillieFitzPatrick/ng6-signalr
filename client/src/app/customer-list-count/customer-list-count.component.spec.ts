import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerListCountComponent } from './customer-list-count.component';

describe('CustomerListCountComponent', () => {
  let component: CustomerListCountComponent;
  let fixture: ComponentFixture<CustomerListCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerListCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
