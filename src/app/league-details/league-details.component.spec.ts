import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueDetailsComponent } from './league-details.component';

describe('LeagueDetailsComponent', () => {
  let component: LeagueDetailsComponent;
  let fixture: ComponentFixture<LeagueDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeagueDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeagueDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
