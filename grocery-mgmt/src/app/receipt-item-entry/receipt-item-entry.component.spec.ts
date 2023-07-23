import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiptItemEntryComponent } from './receipt-item-entry.component';

describe('ReceiptItemEntryComponent', () => {
  let component: ReceiptItemEntryComponent;
  let fixture: ComponentFixture<ReceiptItemEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReceiptItemEntryComponent]
    });
    fixture = TestBed.createComponent(ReceiptItemEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
