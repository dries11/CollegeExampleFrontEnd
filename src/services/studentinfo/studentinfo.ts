import { ViewController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
    selector: 'student-info',
    templateUrl: 'studentinfo.html' 
})
export class StudentInfoModal{

    student: any;

    constructor(public navParams:NavParams, public viewCtrl:ViewController){
        this.student = navParams.data.student;
        console.log(this.student);
    }

    close(){
        this.viewCtrl.dismiss();
    }

}