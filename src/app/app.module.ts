import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FirebaseAppConfig ,AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { Router, AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LeaguesService } from './shared/services/leagues.service';
import { AuthService } from './shared/services/auth.service';
import { HomeComponent } from './home/home.component';
import { LeagueDetailsComponent } from './league-details/league-details.component';

const firebaseConf: FirebaseAppConfig = {
  apiKey: "AIzaSyB4LudPBq6b4kV1FjiotHBurObtCLM4N_I",
  authDomain: "firsta2app.firebaseapp.com",
  databaseURL: "https://firsta2app.firebaseio.com",
  projectId: "firsta2app",
  storageBucket: "firsta2app.appspot.com",
  messagingSenderId: "165998422120"
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LeagueDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    Router,
    AngularFireModule.initializeApp(firebaseConf),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [
    AuthService,
    LeaguesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
