import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as Tesseract from 'tesseract.js';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { Platform ,NavController} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
	
	
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
	 VinID :string;
	 mail: string;
	 items: Observable<any[]>;
	 user :Observable<any[]>;
	 Commantaire :string ;
     name: string ;
    images = [];
    photo: SafeResourceUrl;
    imageText: string;
    words: Array<string>;
  alert : string ;
  constructor(
  public firestore: AngularFirestore,
  public afAuth: AngularFireAuth,
  private sanitizer: DomSanitizer,
  public afDB: AngularFireDatabase,
  public afSG: AngularFireStorage,
  private platform: Platform,
  private splashScreen: SplashScreen,
  private statusBar: StatusBar,
  private navCtrl: NavController,
  

  ) {
	 
    this.items = firestore.collection('items').valueChanges();
   
   this.afAuth.authState.subscribe(auth => {
    if (!auth) {
    	console.log('non connecté');
    } else {
      console.log('connecté: ' + auth.uid );
      
      this.mail = auth.email;
     
    }
  });
   
  }
  

  
getImagesDatabase( word :string) {
this.afDB.list('Images').snapshotChanges(['child_added']).subscribe(images => {
  images.forEach(image => { 
	   this.alert=" ";
	  if( image.payload.exportVal().name== word){
   // console.log('Image: ' + image.payload.exportVal().ref);
    this.getImagesStorage(image);
    this.VinID=image.payload.exportVal().VinID;
}
    else{
		
      this.images=[];
     this.alert =" Ce Vin n'existe pas dans la base de données" ;
     
      }
  });
});
}



getImagesStorage(image:any) {
   const imgRef = image.payload.exportVal().ref;
  this.afSG.ref(imgRef).getDownloadURL().subscribe(imgUrl => {
    console.log(imgUrl);
    this.images.push({
      name: image.payload.exportVal().name,
      url: imgUrl,
      bouche:image.payload.exportVal().bouche,
      degres:image.payload.exportVal().degres,
      marque :image.payload.exportVal().marque,
      matierepremire :image.payload.exportVal().matierepremire,
      origine :image.payload.exportVal().origine,
      VinID :image.payload.exportVal().VinID
      
    });
  });
}



  async takePicture() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl))
    Tesseract.recognize(image.dataUrl).then(result => {
      this.imageText = JSON.stringify(result.data.text.replace('\n','').toUpperCase());  //display result with deleting '\n' (line break), changing result to uppercase (to delete accents)
      this.words = result.data.text.split('\n'); //store words of image in array for future implementation of wine database query
      //for each words look if it appears in the table 'vin'
      this.getImagesDatabase(this.words[2].toString());
     // console.log(this.words[2].toString());
    })
}

  add(){
	  this.firestore.collection('items').add({
		   commentaire:this.Commantaire,
		   user :this.mail,
		  
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







