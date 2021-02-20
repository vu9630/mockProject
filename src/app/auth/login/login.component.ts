import { Component, OnInit } from '@angular/core';
import { UserAuthen } from './../../interface/UserAuthen.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  errorMessage;
  usernamePattern = '^[A-Za-z0-9+_.-]+@(.+)$';
 
  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.authService.signIn(this.email, this.password).subscribe(
      (data: UserAuthen) => {
        localStorage.setItem('token', data.user.token);
        // localStorage.setItem('username', data.user.username);
        this.userService.changeUsername(data.user.username);
        this.userService.changeLoginState();

        this.router.navigate(['']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
}
