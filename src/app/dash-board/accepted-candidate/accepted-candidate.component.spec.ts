import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptedCandidateComponent } from './accepted-candidate.component';

describe('AcceptedCandidateComponent', () => {
  let component: AcceptedCandidateComponent;
  let fixture: ComponentFixture<AcceptedCandidateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcceptedCandidateComponent]
    });
    fixture = TestBed.createComponent(AcceptedCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
