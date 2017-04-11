import { Component } from '@angular/core';
import { NavController, AlertController, ModalController } from 'ionic-angular';

import { StatisticsPage } from '../statistics/statistics.ts'
import { StudentsService } from '../../services/studentsservice';

import { StudentInfoModal } from '../../services/studentinfo/studentinfo';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  studentStats = {
    activeStudents : 0,
    inactiveStudents: 0,
    totalStudents: 0,
    male: 0,
    female: 0
  };
  students: any;

  constructor(public navCtrl: NavController, private studentService:StudentsService, private alertCtrl:AlertController, private modalCtrl:ModalController) {
    this.loadStudents();
  }

  addNewStudent(){
    let prompt = this.alertCtrl.create({
      title: 'Add New Student',
      message: "Enter the fields for the new student",
      inputs: [
        {
          name: 'firstName',
          placeholder: 'First Name'
        },
        {
          name: 'lastName',
          placeholder: 'Last Name'
        },
        {
          name: 'email',
          placeholder: 'Email'
        },
        {
          name: 'password',
          placeholder: 'Password'
        },
        {
          name: 'gender',
          placeholder: 'M or F'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel Clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            data.active = "yes";
            console.log(data);
            this.studentService.createNewStudent(data, data.gender);

          }
        }
      ]
    });
    prompt.present();
  }

  showStudentInfoModal(student){
    let studentInfoModal = this.modalCtrl.create(StudentInfoModal, {
      student: student
    });
    studentInfoModal.present();
  }

  loadStudents(){
    this.studentService.getAllStudents().then(data => {
      this.students = data;
      this.calculateStatistics();
    })
  }

  doRefresh(refresher) {
    this.loadStudents();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  calculateStatistics(){
    this.studentStats.totalStudents = this.students.length;
    this.studentStats.activeStudents = 0;
    this.studentStats.inactiveStudents = 0;

    for(var i = 0; i < this.students.length; i++){
      if(this.students[i].active == 'yes'){
        this.studentStats.activeStudents += 1;
      }
      else if(this.students[i].active == 'no'){
        this.studentStats.inactiveStudents += 1;
      }
      if(this.students[i].gender == 'M'){
        this.studentStats.male++;
      }
      else if(this.students[i].gender == 'F'){
        this.studentStats.female++;
      }
    }
  }

  goToStatsPage(){
    this.navCtrl.push(StatisticsPage, this.studentStats);
  }

}
