import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { StudentsService } from '../../services/studentsservice';
import { States } from '../../data/formData';
import { emailRegex } from '../../data/formData';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-newstudent',
  templateUrl: 'newstudent.html',
})
export class NewStudentPage {

  states: any[] = States;

  newStudentForm: FormGroup;

  submitAttempt: boolean = false;

  state: any;
  State;

  constructor(public navCtrl: NavController, public formBuilder:FormBuilder, public studentService:StudentsService, public alertCtrl:AlertController) {
    this.newStudentForm = formBuilder.group({
      firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      address: ['', Validators.compose([Validators.pattern('[a-zA-Z0-9 ]*'), Validators.required])],
      city: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      state: [''],
      zip: ['', Validators.compose([Validators.maxLength(5), Validators.pattern('[0-9]*'), Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      gender: ['']
    });
  }

  save(){

    this.submitAttempt = true;

    if(!this.newStudentForm.valid){
      alert("Please Fill Out The Form Correctly");
    }
    else{
      this.studentService.createNewStudent(this.newStudentForm); 
      this.navCtrl.setRoot(HomePage);
    }
  }
}
