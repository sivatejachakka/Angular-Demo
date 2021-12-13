import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
 validemail:boolean=true;
 validpwd:boolean=true;
  valid: boolean;
  constructor(private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  login(loginForm) {
    this.valid = true;
    console.log(loginForm.value);
    console.log(loginForm.form);
    console.log(loginForm.form.controls);
    console.log(loginForm.form.controls.EmployeeEmail);
    console.log(loginForm.form.controls.EmployeeEmail.status);
    this.authService.authenticateEmployee(loginForm.value).subscribe( data => {
      console.log(data);
      if (data['success']) {
        console.log('loggedin');
        this.router.navigate(['/employees']);
        this.authService.valid=true;
        this.snackBar.open(`Logged in as ${data['EmployeeId']}`, null, {duration: 4000, panelClass: 'snackbar-success'});
      } else if (data['message'] === 'Wrong password') {
        console.log('wrong password');
        this.valid = false;
        this.validpwd=false;
        loginForm.form.controls.Password.status = 'INVALID';
        this.snackBar.open('Wrong password!', null, {duration: 4000, panelClass: 'snackbar-error'});
      } else if (data['message'] === 'Wrong email') {
        console.log('wrong email');
        this.valid = false;
        this.validemail=false;
        loginForm.form.controls.EmployeeEmail.status = 'INVALID';
        this.snackBar.open('Wrong email!', null, {duration: 4000, panelClass: 'snackbar-error'});
       } //else {
      //   this.valid = false;
      //   loginForm.form.controls.email.status = 'INVALID';
      //   loginForm.form.controls.password.status = 'INVALID';
      //   this.snackBar.open('Invalid credentials!', null, {duration: 4000, panelClass: 'snackbar-error'});

      // }
    }, err => {
      console.log(err);
      this.snackBar.open('Something went wrong. :(', null, {duration: 4000, panelClass: 'snackbar-error'});
    });
  }

}
