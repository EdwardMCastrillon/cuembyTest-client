import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

import { Router } from '@angular/router';

import { LeaguesService } from '../shared/services/leagues.service';
import { AuthService } from '../shared/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isLogin: boolean = true;

  public email: string = "";
  public password: string = "";
  public favoriteLeague: number = 0;
  public leagues: object[];

  constructor (
    private afireAuth: AngularFireAuth,
    private router: Router,
    private leaguesService: LeaguesService,
    private firebaseDb: AngularFirestore,
    private authService: AuthService
  ) { }

  
  ngOnInit() {
    this.leaguesService.getAll().subscribe((leagues) => {
      this.leagues = leagues;
      sessionStorage.setItem("leagues", JSON.stringify(this.leagues));
    });
  }

  public signUp () {
    if (this.email !== "" && this.password !== "" && this.favoriteLeague !== 0) {
      if (this.validateEmail(this.email)) {
        this.afireAuth.auth.createUserWithEmailAndPassword(this.email, this.password)
        .then((authState) => {
          sessionStorage.setItem("uid", authState["uid"]);
          this.authService.authState = authState;
          this.router.navigate(["/home"]);
          this.firebaseDb.collection('userLikes').add({
            userId: authState["uid"],
            leagueId: +this.favoriteLeague,
            position: 1
          });
          this.email = "";
          this.password = "";
        })
        .catch((error) => {
          alert("An error ocurred, please try again");
        });
      } else {
        alert("Invalid email");
      }
    } else {
      alert("Complete all the fields");
    }
  }

  public login () {
    if (this.email !== "" && this.password !== "") {
      this.afireAuth.auth.signInWithEmailAndPassword(this.email, this.password)
      .then((authState) => {
        sessionStorage.setItem("uid", authState["uid"]);
        this.authService.authState = authState;
        this.router.navigate(["/home"]);
        this.email = "";
        this.password = "";
      })
      .catch((error) => {
        alert("Invalid username or password");
      })
    } else {
      alert("Complete all the fields");
    }
  }

  public changeToSignUp () {
    this.isLogin = false;
  }

  public changeToLogin () {
    this.isLogin = true;
  }

  private validateEmail (email: string) {
    const regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (regex.test(email)) {
      return true;
    }
    return false;
  }

}
