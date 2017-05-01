import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { StatisticsPage } from '../pages/statistics/statistics';
import { CurrentStudentsPage } from '../pages/currentstudents/currentstudents';
import { NewStudentPage } from '../pages/newstudent/newstudent';

import { StudentsService } from '../services/studentsservice';
import { HttpModule } from '@angular/http';
import { StudentInfoModal } from '../services/studentinfo/studentinfo';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    StatisticsPage,
    StudentInfoModal,
    CurrentStudentsPage,
    NewStudentPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    StatisticsPage,
    StudentInfoModal,
    CurrentStudentsPage,
    NewStudentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StudentsService,
  ]
})
export class AppModule {}
