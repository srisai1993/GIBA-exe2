import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpCardFormComponent } from './emp-card-form.component';

describe('EmpCardFormComponent', () => {
  let component: EmpCardFormComponent;
  let fixture: ComponentFixture<EmpCardFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpCardFormComponent]
    });
    fixture = TestBed.createComponent(EmpCardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
