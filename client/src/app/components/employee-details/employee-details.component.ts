import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { User } from 'src/app/employee';
import { AuthService } from '../../services/auth/auth.service';


@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  public empId;
  public employee:any;
  public employeeModel:any;
  public isActive:boolean;
  // public emailValid:boolean;
  constructor(private activatedRoute: ActivatedRoute, private route: Router,private authService: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit(){
    this.activatedRoute.paramMap.subscribe((params:ParamMap)=>{
      let id=params.get('EmployeeId');
      this.empId=id;
      this.employee=this.authService.employee;
      console.log(this.employee);
    });
    this.employeeModel = new User(this.employee.EmployeeId,this.employee.EmployeeName,this.employee.EmployeeEmail,this.employee.PhoneNumber,this.employee.Designation,this.employee.Status);
    if(this.employeeModel.Status==="Active"){
      this.isActive=true;
    }else{
      this.isActive=false;
    }
    // this.emailValid=this.emailValidation(this.employeeModel.EmployeeEmail);
  }

  toPrevious(){
    let id=this.empId;
    let num=parseInt(id.substring(6))-1;
    let previousId='EMPID-'+(num+'').padStart(4,'0');
    this.route.navigate(['/employees',previousId]);
  }

  toNext(){
    let id=this.empId;
    let num=parseInt(id.substring(6))+1;
    let nextId='EMPID-'+(num+'').padStart(4,'0');;
    this.route.navigate(['/employees',nextId]);
  }

  goBack(){
    this.route.navigate(['../'],{relativeTo:this.activatedRoute});
  }

  updateDetails(userModel){
    this.authService.updateEmployee(userModel).subscribe(data=>{
      console.log(data);
      if (data['success']) {
        this.snackBar.open('Updated Successfully. :)', null, {duration: 4000, panelClass: 'snackbar-success'});
      }else{
        this.snackBar.open('Something went wrong. :(', null, {duration: 4000, panelClass: 'snackbar-error'});
       }
    })
  }

}