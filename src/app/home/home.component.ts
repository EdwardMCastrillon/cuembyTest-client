import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore } from 'angularfire2/firestore';

import { AuthService } from './../shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public leagues: object[] = [];
  public userLikes: object[];
  public userId: string;

  constructor (
    private router: Router,
    private firebaseDb: AngularFirestore,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userId = sessionStorage.getItem("uid");
    const userLikes = this.firebaseDb.collection("userLikes", ref => ref.where("userId", "==", this.userId)).valueChanges();
    userLikes.subscribe((data) => {
      this.orderLeaguesByLikes(data);
    })
    const userLike = this.firebaseDb.collection("userLikes", ref => ref.where("userId", "==", this.userId)).snapshotChanges();
    userLike.subscribe((data) => {
      this.userLikes = data;
      this.extractDocuments(this.userLikes);
    });
  }

  public extractDocuments (userLikes: object[]) {
    this.userLikes = this.userLikes.map((like) => {
      const data = like["payload"]["doc"]["data"]();
      const id = like["payload"]["doc"]["id"];
      return { id: id, ...data };
    });
  }

  public goToLeagueDetails (leagueId: number) {
    this.router.navigate(["/league-detail"], { queryParams: { id: leagueId } });
  }

  private orderLeaguesByLikes (userLikes) {
    let leagues = JSON.parse(sessionStorage.getItem("leagues"));
    const orderedLeagues = [];
    this.leagues = [];
    userLikes.map((like) => {
      leagues.map((league) => {
        if (like["leagueId"] == league["id"]) {
          league["position"] = like["position"]
          orderedLeagues.push(league);
        }
      })
    })
    leagues.map((league) => {
      if (!orderedLeagues.includes(league)) {
        league["position"] = 3;
        orderedLeagues.push(league);
      }
    })
    
    this.leagues = orderedLeagues;
  }

  public removeLike (leagueId: number) {
    let idToUpdate;
    const likeRef = this.firebaseDb.collection("userLikes");

    this.userLikes.map((like) => {
      if (like["leagueId"] == leagueId && like["userId"] == this.userId) {
        idToUpdate = like["id"];
      }
    });
    likeRef.doc(idToUpdate).delete();
  }

  public addLike (leagueId: number) {
    let idToUpdate;
    const likeRef = this.firebaseDb.collection("userLikes");
    likeRef.add({ userId: this.userId, leagueId: leagueId, position: 2 });
  }

  public removeLeague (leagueId: number) {
    let idToUpdate;
    const likeRef = this.firebaseDb.collection("userLikes");
    likeRef.add({ userId: this.userId, leagueId: leagueId, position: 0 });
  }

}
