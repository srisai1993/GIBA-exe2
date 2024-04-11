import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BpassComponent } from './bpass.component';

describe('BpassComponent', () => {
  let component: BpassComponent;
  let fixture: ComponentFixture<BpassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BpassComponent]
    });
    fixture = TestBed.createComponent(BpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
