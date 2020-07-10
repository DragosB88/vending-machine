import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendingDisplayComponent } from './vending-display.component';

describe('VendingDisplayComponent', () => {
  let component: VendingDisplayComponent;
  let fixture: ComponentFixture<VendingDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendingDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendingDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
