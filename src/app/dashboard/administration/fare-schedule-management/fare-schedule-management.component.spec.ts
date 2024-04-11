import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FareScheduleManagementComponent } from './fare-schedule-management.component';

describe('FareScheduleManagementComponent', () => {
  let component: FareScheduleManagementComponent;
  let fixture: ComponentFixture<FareScheduleManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FareScheduleManagementComponent]
    });
    fixture = TestBed.createComponent(FareScheduleManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
