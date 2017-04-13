import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class StudentsService{

    serverUrl: string = "http://localhost:8080/students";
    photosUrl: string = "https://randomuser.me/api/";
    students: [any] = [""];
    photoUrl: string;

    constructor(private http:Http){
    }

    getAllStudents(){
        return new Promise(resolve => {
            this.http.get(this.serverUrl + "/all").map(res => res.json()).subscribe(data => {
                this.students = data;
                resolve(this.students);
            });
        })
    }

    createNewStudent(student:any): any{
        this.http.post(this.serverUrl + "/add", student).subscribe(data => {
            return data;
        });
    }
    

    removeStudent(id: any): any{
        this.http.post(this.serverUrl + "/remove", id).subscribe(data => {
            return data;
        });
    }

}