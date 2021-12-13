import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // public url='http://localhost:3000';
  emp:any;
  valid:boolean;
  employee:any;
  constructor(private http: HttpClient) { }

  authenticateEmployee(emp) {
    const headers = {'Content-Type': 'application/json'};
    return this.http.post('http://localhost:3000/authenticate', emp, {headers: headers});
  }

  updateEmployee(emp) {
    const headers = {'Content-Type': 'application/json'};
    return this.http.put(`http://localhost:3000/employees/${emp.EmployeeId}`, emp, {headers: headers});
  }

  getEmployees(){
    return this.http.get('http://localhost:3000/employees')
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error:HttpErrorResponse){
    return throwError(error.message || "Unknown Server Error");
  }

  loggedIn() {
    return this.valid;
  }

}
