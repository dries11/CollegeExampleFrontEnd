import { Component } from '@angular/core';
import { NavController, AlertController, ModalController } from 'ionic-angular';

import { StudentsService } from '../../services/studentsservice';

import { StudentInfoModal } from '../../services/studentinfo/studentinfo';

@Component({
  selector: 'page-currentstudents',
  templateUrl: 'currentstudents.html'
})
export class CurrentStudentsPage {


  students: any;

  constructor(public navCtrl: NavController, private studentService:StudentsService, private alertCtrl:AlertController, private modalCtrl:ModalController) {
    this.loadStudents();
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
    })
  }

}
