import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedCandidateComponent } from './rejected-candidate.component';

describe('RejectedCandidateComponent', () => {
  let component: RejectedCandidateComponent;
  let fixture: ComponentFixture<RejectedCandidateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RejectedCandidateComponent]
    });
    fixture = TestBed.createComponent(RejectedCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
