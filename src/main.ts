import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


import { AppModule2 } from './app/app.module2';


import { defineCustomElements } from '@ionic/pwa-elements/loader';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));




