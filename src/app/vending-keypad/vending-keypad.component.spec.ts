import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendingKeypadComponent } from './vending-keypad.component';

describe('VendingKeypadComponent', () => {
  let component: VendingKeypadComponent;
  let fixture: ComponentFixture<VendingKeypadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendingKeypadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendingKeypadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
