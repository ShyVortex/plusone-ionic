import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewTherapyPage } from './new-therapy.page';

describe('NewTherapyPage', () => {
  let component: NewTherapyPage;
  let fixture: ComponentFixture<NewTherapyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTherapyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
