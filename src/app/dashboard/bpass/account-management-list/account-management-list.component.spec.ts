import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountManagementListComponent } from './account-management-list.component';

describe('AccountManagementListComponent', () => {
  let component: AccountManagementListComponent;
  let fixture: ComponentFixture<AccountManagementListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountManagementListComponent]
    });
    fixture = TestBed.createComponent(AccountManagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
