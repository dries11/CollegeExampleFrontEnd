import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Chart } from 'chart.js';
import { StudentsService } from '../../services/studentsservice';

@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html',
})
export class StatisticsPage {

  @ViewChild('activeVsInactivePieCanvas') activeVsInactivePieCanvas;
  @ViewChild('maleVsFemaleBarCanvas') maleVsFemaleBarCanvas;

  activeVsInactivePieGraph: any;
  maleVsFemaleBarGraph: any;
  malePercentage: any;
  femalePercentage: any;
  students:any;
  statistics = {
    activeStudents : 0,
    inactiveStudents: 0,
    totalStudents: 0,
    male: 0,
    female: 0
  };


  constructor(public navCtrl: NavController, public navParams: NavParams, public studentService:StudentsService) {
  }

  ionViewDidLoad() {
    this.loadStudents();
  }

  loadActiveVsInactivePieGraph(){
    this.activeVsInactivePieGraph = new Chart(this.activeVsInactivePieCanvas.nativeElement, {
      
      type: 'doughnut',
      data: {
        labels: ["Active","Inactive"],
        datasets: [{
          label: '# of Students',
          data: [this.statistics.activeStudents, this.statistics.inactiveStudents],
          backgroundColor: [
            'rgba(0,66,209,0.2)',
            'rgba(255,97,0,0.2)'
          ],
          hoverBackgroundColor: [
            "#0042D1",
            "#FF6100"
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

  }

  loadMaleVsFemaleGraph(){
    this.maleVsFemaleBarGraph = new Chart(this.maleVsFemaleBarCanvas.nativeElement, {

      type: 'bar',
      data: {
        labels: ["Male","Female"],
        datasets: [{
          label: '% Gender',
          data: [this.malePercentage, this.femalePercentage],
          backgroundColor: [
            'rgba(0,66,209,0.2)',
            'rgba(255,97,0,0.2)'
          ],
          borderColor: [
            'rgba(0,66,209,1)',
            'rgba(255,97,0,1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              max: 100
            }
          }]
        }
      }
    });
  }

  createPercents(){
    this.malePercentage = Math.floor((this.statistics.male/this.statistics.totalStudents) * 100);
    this.femalePercentage = Math.ceil((this.statistics.female/this.statistics.totalStudents) * 100);
  }

    calculateStatistics(){
    this.statistics.totalStudents = this.students.length;
    this.statistics.activeStudents = 0;
    this.statistics.inactiveStudents = 0;

    for(var i = 0; i < this.students.length; i++){
      if(this.students[i].enrolled == 'yes'){
        this.statistics.activeStudents += 1;
      }
      else if(this.students[i].enrolled == 'no'){
        this.statistics.inactiveStudents += 1;
      }
      if(this.students[i].gender == 'M'){
        this.statistics.male++;
      }
      else if(this.students[i].gender == 'F'){
        this.statistics.female++;
      }
    }
  }

  loadStudents(){
    this.studentService.getAllStudents().then(data => {
      this.students = data;
    }).then(() => {
      this.calculateStatistics();
      this.createPercents();
      this.loadActiveVsInactivePieGraph();
      this.loadMaleVsFemaleGraph();
    })
  }

}
