import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from '@angular/fire/storage';




export const firebaseConfig = {
    
    apiKey: "AIzaSyArl2G-SkzpUq_MfcK_sRlZCxopdTgR4LQ",
    authDomain: "urbprojet.firebaseapp.com",
    databaseURL: "https://urbprojet.firebaseio.com",
    projectId: "urbprojet",
    storageBucket: "urbprojet.appspot.com",
    messagingSenderId: "240186359807",
    appId: "1:240186359807:web:67404394e2c46f9c49b1ca",
    measurementId: "G-04BQFWR897"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
     AngularFirestoreModule
  ],

  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
