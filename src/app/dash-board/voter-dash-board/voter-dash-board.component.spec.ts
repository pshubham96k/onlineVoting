import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoterDashBoardComponent } from './voter-dash-board.component';

describe('VoterDashBoardComponent', () => {
  let component: VoterDashBoardComponent;
  let fixture: ComponentFixture<VoterDashBoardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoterDashBoardComponent]
    });
    fixture = TestBed.createComponent(VoterDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
