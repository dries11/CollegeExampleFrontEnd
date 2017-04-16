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
          name: 'address',
          placeholder: 'Street'
        },
        {
          name: 'city',
          placeholder: 'City'
        },
        {
          name: 'state',
          placeholder: 'State'
        },
        {
          name: 'zip',
          placeholder: 'Zip Code'
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
            data.enrolled = "yes";
            this.studentService.createNewStudent(data);
            this.loadStudents();
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
    })
  }

}
