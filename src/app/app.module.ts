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

@NgModule({
  declarations: [
    MyApp,
    PoliticiansPage,
    ProjectsPage,
    AboutPage,
    HomePage,
    TabsPage,
    GlobalGoalsComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    PoliticiansPage,
    ProjectsPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProjectCategoriesProvider
  ]
})
export class AppModule {}
