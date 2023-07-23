import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersistentToolbarComponent } from './persistent-toolbar.component';

describe('PersistentToolbarComponent', () => {
  let component: PersistentToolbarComponent;
  let fixture: ComponentFixture<PersistentToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersistentToolbarComponent]
    });
    fixture = TestBed.createComponent(PersistentToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
