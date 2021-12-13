import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public EmpList;
  public ErrMsg;
  constructor(private authService: AuthService,private router:Router, private activatedRoute: ActivatedRoute) { }
  ngOnInit(){
    this.authService.getEmployees().subscribe(
      data=>this.EmpList=data["emp"],
      error=>this.ErrMsg=error
    );
  }
  
  onSelect(emp){
    this.authService.employee=emp;
    this.router.navigate([emp.EmployeeId],{relativeTo:this.activatedRoute});
  }

}
