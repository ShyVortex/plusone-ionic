import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationDeniedPage } from './notification-denied.page';

describe('NotificationDeniedPage', () => {
  let component: NotificationDeniedPage;
  let fixture: ComponentFixture<NotificationDeniedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationDeniedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
