import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationAcceptedPage } from './notification-accepted.page';

describe('NotificationAcceptedPage', () => {
  let component: NotificationAcceptedPage;
  let fixture: ComponentFixture<NotificationAcceptedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationAcceptedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
