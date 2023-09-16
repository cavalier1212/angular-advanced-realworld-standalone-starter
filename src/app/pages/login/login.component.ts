import { map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './../../login.service';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('tEmail') email!: NgModel
  @ViewChild('tPassword') password!: NgModel

  redirectUrl: string = '';

  router = inject(Router)
  loginService = inject(LoginService)
  route = inject(ActivatedRoute)

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params=>{
      console.log('params: ', params.get('redirect'));
      this.redirectUrl = params.get('redirect') || '';
    })
  }

  onSubmit(form: NgForm){
    this.loginService.login({
      email: this.email.value,
      password: this.password.value
    }).pipe(
      map(data=>data.user.token)
    ).subscribe({
      next: (token)=>{
        localStorage.setItem('token', token);
        this.router.navigate([this.redirectUrl || '/'])
      },
      error: (err: HttpErrorResponse)=>{
        console.log(err.error.body[0]);
        alert(err.error.body[0]);
      }
    })
  }

}
