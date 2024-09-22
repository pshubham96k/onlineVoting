import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentElectionsComponent } from './current-elections.component';

describe('CurrentElectionsComponent', () => {
  let component: CurrentElectionsComponent;
  let fixture: ComponentFixture<CurrentElectionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentElectionsComponent]
    });
    fixture = TestBed.createComponent(CurrentElectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
