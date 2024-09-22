import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnverifyCandidateComponent } from './unverify-candidate.component';

describe('UnverifyCandidateComponent', () => {
  let component: UnverifyCandidateComponent;
  let fixture: ComponentFixture<UnverifyCandidateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnverifyCandidateComponent]
    });
    fixture = TestBed.createComponent(UnverifyCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
