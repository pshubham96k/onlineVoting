import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotingStatusComponent } from './voting-status.component';

describe('VotingStatusComponent', () => {
  let component: VotingStatusComponent;
  let fixture: ComponentFixture<VotingStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VotingStatusComponent]
    });
    fixture = TestBed.createComponent(VotingStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
