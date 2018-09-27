import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { PoliticiansPage } from '../pages/politicians/politicians';
import { ProjectsPage } from '../pages/projects/projects';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProjectCategoriesProvider } from '../providers/project-categories/project-categories';
import { GlobalGoalsComponent } from '../components/global-goals/global-goals';
import {LoginPage} from "../pages/login/login";
import {Facebook} from "@ionic-native/facebook";
import {GooglePlus} from "@ionic-native/google-plus";
import {AngularFireModule} from "@angular/fire";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {AlertServiceProvider} from "../providers/alert-service/alert-service";

let config = {
  apiKey: "AIzaSyBEHCmwiBelzvAE80Y6m9d_9gCohpkBtnY",
  authDomain: "govzero-app.firebaseapp.com",
  databaseURL: "https://govzero-app.firebaseio.com",
  projectId: "govzero-app",
  storageBucket: "govzero-app.appspot.com",
  messagingSenderId: "1016755266372"
};

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    PoliticiansPage,
    ProjectsPage,
    AboutPage,
    HomePage,
    TabsPage,
    GlobalGoalsComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFirestoreModule.enablePersistence() // to work offline
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    PoliticiansPage,
    ProjectsPage,
    LoginPage,
    HomePage,
    TabsPage
  ],
  providers: [
    Facebook,
    GooglePlus,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProjectCategoriesProvider,
    AlertServiceProvider
  ]
})
export class AppModule {}
