import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { turnYellow } from '../login/animations/turn-yellow';
import { turnGreen } from '../login/animations/turn-green';
import { moveIcon } from '../login/animations/move-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  animations: [moveIcon, turnYellow, turnGreen],
})
export class RegisterComponent implements OnInit {
  public isFull:boolean = false
  public isValid:boolean = true
  public errMessage:string = ''

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
        Validators.pattern(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/)
      ])
    ],
    confirmPassword: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.registerForm.get('password')?.value == this.registerForm.get('confirmPassword')?.value){
      if(this.registerForm.valid){
        console.log('registrado') //replace for firebase submit later
      }
    }
  }
  anim() {
    if ((this.registerForm.value.userName || this.registerForm.value.password || this.registerForm.value.confirmPassword)) {
      this.isFull = true;
    } else {
      this.isFull = false;
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
  updateErrorMessage(){//the last if statement will update the messge, sorted by order of importance
    if(this.registerForm.touched){
      let tempErrMessage = ''

      if(this.registerForm.valid){
        tempErrMessage = ''
      }
      if(this.registerForm.get('password')?.value != this.registerForm.get('confirmPassword')?.value){
        tempErrMessage = 'As senhas inseridas são diferentes'
        console.log(1)
      }
      if(this.registerForm.get('password')?.errors?.['pattern']){
        tempErrMessage = 'Sua senha deve conter no minimo 6 caracteres, uma letra maiúscula e uma minúscula, um numero e um caractere especial.'
      }
      if(this.registerForm.get('password')?.errors?.['minlength']){
        tempErrMessage = 'Sua senha deve conter no minimo 6 caracteres, uma letra maiúscula e uma minúscula, um numero e um caractere especial.'
      }

      if(this.registerForm.get('userName')?.errors?.['email']){
        tempErrMessage = 'O email inserido é inválido'
      }
      if(this.registerForm.get('userName')?.errors?.['required']||this.registerForm.get('password')?.errors?.['required']){
        tempErrMessage = 'Todos os campos são obrigatórios'
        console.log(4)
      }
      this.errMessage = tempErrMessage
    }
  }
}
