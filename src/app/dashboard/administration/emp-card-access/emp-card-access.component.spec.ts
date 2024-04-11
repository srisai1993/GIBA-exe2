import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpCardAccessComponent } from './emp-card-access.component';

describe('EmpCardAccessComponent', () => {
  let component: EmpCardAccessComponent;
  let fixture: ComponentFixture<EmpCardAccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpCardAccessComponent]
    });
    fixture = TestBed.createComponent(EmpCardAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
