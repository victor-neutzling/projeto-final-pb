import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
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

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    console.log(this.loginForm.value.userName, this.loginForm.value.password);
  }

  ngOnInit(): void {}

  anim() {

    if ((this.loginForm.value.userName || this.loginForm.value.password)) {
      this.isFull = true;
    } else {
      this.isFull = false;
    }
  }

  validate(){
    if((((this.loginForm.get('userName')?.touched || this.loginForm.get('password')?.touched) && this.loginForm.get('userName')?.errors?.['required']) || ((this.loginForm.get('userName')?.touched || this.loginForm.get('password')?.touched) && this.loginForm.get('password')?.errors?.['required'])) || (this.loginForm.get('userName')?.touched || this.loginForm.get('password')?.touched) && ((!this.loginForm.value.userName || !this.loginForm.value.password))){
      this.isValid = false

    }else{
      this.isValid = true;

    }
  }
}
