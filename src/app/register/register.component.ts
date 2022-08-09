import { Router, RouterModule } from '@angular/router';
import { AuthService } from './../shared/services/auth/auth.service';
import { turnTextGreen } from './../login/animations/turn-text-green';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { turnYellow } from '../login/animations/turn-yellow';
import { turnGreen } from '../login/animations/turn-green';
import { moveIcon } from '../login/animations/move-icons';
import { hasLowerCase, hasNumber, hasSpecialCharacters, hasUpperCase } from '../shared/validators/regex-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [moveIcon, turnYellow, turnGreen, turnTextGreen],
})
export class RegisterComponent {
  public isFull:boolean = false
  public isValid:boolean = true
  public errMessage:string = ''

  hasUpper = false
  hasLower = false
  hasNumber = false
  hasSpecial = false
  isLongEnough = false

  @Input() userName: string = '';
  @Input() password: string = '';
  @Input() confirmPassword: string = '';

  public registerForm = this.fb.group({
    userName: ['',
     Validators.compose([
      Validators.required,
      Validators.email
     ])
    ],
    password: ['',
      Validators.compose([
        Validators.required,
        Validators.minLength(6),
        hasLowerCase,
        hasUpperCase,
        hasNumber,
        hasSpecialCharacters
      ])
    ],
    confirmPassword: ['', Validators.required]
  });

  constructor(private router:Router, private authService:AuthService, private fb: FormBuilder) { }

  onSubmit(){
    if(this.registerForm.get('password')?.value == this.registerForm.get('confirmPassword')?.value){
      if(this.registerForm.valid){
        this.register(this.registerForm.get('userName')?.value as string, this.registerForm.get('password')?.value as string)
      }
    }
  }

  register(un:string,pw:string){
    this.authService.SignUp(un,pw)
  }

  anim() {
    if ((this.registerForm.value.userName || this.registerForm.value.password || this.registerForm.value.confirmPassword)) {
      return true;
    } else {
      return false;
    }
  }
  validate(){
    if(this.registerForm.touched){
      this.isValid = this.registerForm.valid
      if(this.registerForm.get('password')?.value != this.registerForm.get('confirmPassword')?.value){
        this.isValid = false
      }
    }
  }
  logErrors(){
    this.hasUpper = this.registerForm.get('password')?.errors?.['hasUpperCase']? false : true
    this.hasLower = this.registerForm.get('password')?.errors?.['hasLowerCase']? false : true
    this.hasNumber = this.registerForm.get('password')?.errors?.['hasNumber']? false : true
    this.hasSpecial = this.registerForm.get('password')?.errors?.['hasSpecialCharacters']? false : true
    this.isLongEnough = this.registerForm.get('password')?.errors?.['minlength']? false : true
  }
}
