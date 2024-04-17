import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DrugsPage } from './drugs.page';

describe('DrugsPage', () => {
  let component: DrugsPage;
  let fixture: ComponentFixture<DrugsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
