import { AuthService } from './../shared/services/auth/auth.service';
import { ActivatedRoute, Router, } from '@angular/router';
import { Component, OnInit, } from '@angular/core';
import {
  FormBuilder,
  Validators,
} from '@angular/forms';
import { moveIcon } from './animations/move-icons';
import { turnYellow } from './animations/turn-yellow';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [moveIcon, turnYellow],
})
export class LoginComponent implements OnInit {
  isFull = false;
  isValid = true;

  public loginForm = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private authService:AuthService, private fb: FormBuilder, private router:Router, private route:ActivatedRoute ) {}

  onSubmit() {
    if(this.loginForm.valid)
    this.authService.SignIn(this.loginForm.get('userName')?.value as string, this.loginForm.get('password')?.value as string)
    //this.router.navigate(['home'])
  }

  ngOnInit(): void {
    console.log(JSON.parse(localStorage.getItem('user') as string))
  }

  anim() {

    if ((this.loginForm.value.userName || this.loginForm.value.password)) {
      this.isFull = true;
    } else {
      this.isFull = false;
    }
  }

  validate(){
    if(this.loginForm.touched)
    this.isValid = this.loginForm.valid

  }
}
