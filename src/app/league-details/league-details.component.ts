import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LeaguesService } from './../shared/services/leagues.service';

@Component({
  selector: 'app-league-details',
  templateUrl: './league-details.component.html',
  styleUrls: ['./league-details.component.scss']
})
export class LeagueDetailsComponent implements OnInit {

  public leagueId: number;
  public league: object = {};
  public teamsInfo: object[] = [];
  public leagueTableInfo: object[] = [];

  public view: string = "teams";

  constructor (
    private route: ActivatedRoute,
    private router: Router,
    private leaguesService: LeaguesService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.leagueId = +params["id"];
    })
    this.league = JSON.parse(sessionStorage.getItem("leagues")).find((league) => {
      return league.id === this.leagueId;
    });
    const teamsInfoUrl = this.league["_links"]["teams"]["href"];
    const leagueTableInfoUrl = this.league["_links"]["leagueTable"]["href"];
    this.leaguesService.getExtraData(teamsInfoUrl, leagueTableInfoUrl).subscribe((leagueExtras) => {
      this.leagueTableInfo = leagueExtras["leagueTable"];
      this.teamsInfo = leagueExtras["leagueTeams"];
      console.log(leagueExtras)
    });
  }

  public changeView (view: string) {
    this.view = view;
  }

  public goToHome () {
    this.router.navigate(["/home"]);
  }

}
