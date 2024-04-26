import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BugreportPage } from './bugreport.page';

describe('BugreportPage', () => {
  let component: BugreportPage;
  let fixture: ComponentFixture<BugreportPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BugreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
