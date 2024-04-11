import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditorReportComponent } from './auditor-report.component';

describe('AuditorReportComponent', () => {
  let component: AuditorReportComponent;
  let fixture: ComponentFixture<AuditorReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditorReportComponent]
    });
    fixture = TestBed.createComponent(AuditorReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
