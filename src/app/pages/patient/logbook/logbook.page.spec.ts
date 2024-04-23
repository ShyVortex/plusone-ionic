import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogbookPage } from './logbook.page';

describe('NotificationsPage', () => {
  let component: LogbookPage;
  let fixture: ComponentFixture<LogbookPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LogbookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
