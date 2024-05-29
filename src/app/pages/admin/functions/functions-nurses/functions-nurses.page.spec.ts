import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FunctionsNursesPage } from './functions-nurses.page';

describe('FunctionsNursesPage', () => {
  let component: FunctionsNursesPage;
  let fixture: ComponentFixture<FunctionsNursesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionsNursesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
