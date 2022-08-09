import { AuthService } from './../shared/services/auth/auth.service';
import { ActivatedRoute, Router, } from '@angular/router';
import { Component, OnInit, ViewChild, } from '@angular/core';
import {
  FormBuilder,
  NgForm,
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
export class LoginComponent {
  isFull = false;
  isValid = true; //should be true but changes to false when the form is created

  public loginForm = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private authService:AuthService, private fb: FormBuilder, private router:Router, private route:ActivatedRoute ) {}

  onSubmit() {
    if(this.loginForm.valid)
    this.login(this.loginForm.get('userName')?.value as string, this.loginForm.get('password')?.value as string)
    //this.router.navigate(['home'])
  }

  login(un:string,pw:string){
    this.authService.SignIn(un,pw)
  }
  anim() {
    if ((this.loginForm.value.userName || this.loginForm.value.password)) {
      return true;
    } else {
      return false;
    }
  }

  validate(){
    if(this.loginForm.touched)
    this.isValid = this.loginForm.valid
  }
}
