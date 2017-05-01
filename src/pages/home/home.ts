import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';

import { CurrentStudentsPage } from '../currentstudents/currentstudents';
import { StatisticsPage } from '../statistics/statistics';
import { NewStudentPage } from '../newstudent/newstudent';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  constructor(public navCtrl: NavController) {
    
  }

  toCurrentStudentsPage(){
    this.navCtrl.push(CurrentStudentsPage);
  }

  toStatisticsPage(){
    this.navCtrl.push(StatisticsPage);
  }

  toNewStudentPage(){
    this.navCtrl.push(NewStudentPage);
  }

}
