import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FunctionsPage } from './functions.page';

describe('FunctionsPage', () => {
  let component: FunctionsPage;
  let fixture: ComponentFixture<FunctionsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
