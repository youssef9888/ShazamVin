/*import { Component } from "@angular/core";

import { Platform } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"]
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString("#3880ff");
      // this.statusBar.styleDefault();
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
    });
  }
}*/

import { Component, OnInit } from '@angular/core';

import { Platform ,NavController} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
   
  mail: string;

   
 public selectedIndex = 0;
 private appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    
    {
      title: 'Logout',
      url: '/login',
      icon: 'log-out'
    },
    {
      title: 'admin',
      url: '/admin',
      icon: 'construct'
    },
        
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
     private navCtrl: NavController,
     public afAuth: AngularFireAuth
  ) {
    this.initializeApp();
      this.afAuth.authState.subscribe(auth => {
    if (!auth) {
    	console.log('non connecté');
    } else {
      console.log('connecté: ' + auth.uid);
      
      this.mail = auth.email;
     
    }
  });
    
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
