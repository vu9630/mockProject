import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { error } from 'protractor';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  email: string;
  password: string;
  username: any;
  err;
  usernamePattern = '^[A-Za-z0-9+_.-]+@(.+)$';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.authService.signUp(this.username, this.email, this.password).subscribe(
      (data) => {
        this.router.navigate(['login']);
      },
      (errorRespone) => {
        this.err = errorRespone;
      }
    );
  }
}
