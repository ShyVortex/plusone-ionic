import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BugreportConfirmPage } from './bugreport-confirm.page';

describe('BugreportConfirmPage', () => {
  let component: BugreportConfirmPage;
  let fixture: ComponentFixture<BugreportConfirmPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BugreportConfirmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
