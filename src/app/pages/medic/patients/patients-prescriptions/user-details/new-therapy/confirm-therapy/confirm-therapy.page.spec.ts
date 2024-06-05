import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmTherapyPage } from './confirm-therapy.page';

describe('ConfirmTherapyPage', () => {
  let component: ConfirmTherapyPage;
  let fixture: ComponentFixture<ConfirmTherapyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmTherapyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
