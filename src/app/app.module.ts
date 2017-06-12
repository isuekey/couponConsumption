import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { LoginComponent } from "../components/login/login";

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { MePage } from '../pages/me/me';
import { ClerklistComponent } from "../pages/clerklist/clerklist";
import { TemplatelistComponent } from "../pages/templatelist/templatelist";
import { ShopWorkComponent } from "../pages/shopwork/shopwork";
import { WriteoffComponent } from "../pages/writeoff/writeoff";

import { HttpManager } from "../manager/httpmanager";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
    declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    MePage,
    ShopWorkComponent,WriteoffComponent,
    TabsPage,
    ClerklistComponent,TemplatelistComponent,
    LoginComponent
    ],
    imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    MePage,
    ShopWorkComponent,WriteoffComponent,
    TabsPage,
    ClerklistComponent,TemplatelistComponent,
    LoginComponent
    ],
    providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpManager
    ]
})
export class AppModule {}
