import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterModule } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';
import { AuthService } from '../shared/services/auth/auth.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireDatabaseModule,
        RouterTestingModule
      ],
      providers:[AuthService,

        FormBuilder
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('isFull should have default value of false',()=>{
    expect(component.isFull).toBe(false)
  })
  it('isValid should have default value of false',()=>{
    expect(component.isFull).toBe(false)
  })
  it('errMessage should have an empty string as default value',()=>{
    expect(component.errMessage).toBe('');
  })
  // it('should call the register function if both passwords are equal and the register form is valid when onSubmit method is called',()=>{
  //   const spy = spyOn(component, 'register')
  //   const someUsername = 'testemail123@gmail.com'
  //   const password = '1a!Azzz'

  //   component.registerForm.patchValue({
  //     userName: someUsername,
  //     password: password,
  //     confirmPassword: password
  //   })
  //   fixture.detectChanges()

  //   component.onSubmit();

  //   expect(spy).toHaveBeenCalled()
  // })
  it('should not call the register function if both passwords are not equal',()=>{
    const spy = spyOn(component, 'register')
    const someUsername = 'testemail123@gmail.com'
    const password = '1a!Azzz'

    component.registerForm.patchValue({
      userName: someUsername,
      password: password,
      confirmPassword: 'notEqual'
    })
    fixture.detectChanges()

    component.onSubmit();

    expect(spy).not.toHaveBeenCalled()
  })
  it('should not call the register function if form is invalid when onSubmit method is called',()=>{
    const spy = spyOn(component, 'register')
    const someUsername = 'invalidemail' //does not pass email validator
    const password = 'invalidpassword' //does not pass password regex validators

    component.registerForm.patchValue({
      userName: someUsername,
      password: password,
      confirmPassword: password
    })
    fixture.detectChanges()

    component.onSubmit();

    expect(spy).not.toHaveBeenCalled()
  })

  //validation tests

  it('should not validate the form when the inserted email does not match the validation criteria', ()=>{
    const someUsername = 'invalidemail' //does not pass email validator
    const password = 'Aa1!zzz' //matches the validation

    component.registerForm.patchValue({
      userName: someUsername,
      password: password,
      confirmPassword: password
    })
    fixture.detectChanges()
    expect(component.registerForm.valid).toBeFalsy()
  })
  it('should not validate the form when the inserted password contains less than 6 characters', ()=>{
    const someUsername = 'testEmail123@gmail.com'
    const password = 'Aa1!' //matches the validation criteria but contains less than 6 chars

    component.registerForm.patchValue({
      userName: someUsername,
      password: password,
      confirmPassword: password
    })
    fixture.detectChanges()
    expect(component.registerForm.valid).toBeFalsy()
  })
  it('should not validate the form when the inserted password does not contain an uppercase character', ()=>{
    const someUsername = 'testEmail123@gmail.com'
    const password = 'aa1!zzz' //requires an uppercase character to validate

    component.registerForm.patchValue({
      userName: someUsername,
      password: password,
      confirmPassword: password
    })
    fixture.detectChanges()
    expect(component.registerForm.valid).toBeFalsy()
  })
  it('should not validate the form when the inserted password does not contain a special character', ()=>{
    const someUsername = 'testEmail123@gmail.com'
    const password = 'Aa11zzz' //requires a special character to validate

    component.registerForm.patchValue({
      userName: someUsername,
      password: password,
      confirmPassword: password
    })
    fixture.detectChanges()
    expect(component.registerForm.valid).toBeFalsy()
  })
  it('should not validate the form when the inserted password does not contain a number', ()=>{
    const someUsername = 'testEmail123@gmail.com'
    const password = 'Aa!!zzz' //requires a number character to validate

    component.registerForm.patchValue({
      userName: someUsername,
      password: password,
      confirmPassword: password
    })
    fixture.detectChanges()
    expect(component.registerForm.valid).toBeFalsy()
  })
  it('should not validate the form when the inserted password does not contain a lowercase character', ()=>{
    const someUsername = 'testEmail123@gmail.com'
    const password = 'AA1!ZZZ' //requires a number character to validate

    component.registerForm.patchValue({
      userName: someUsername,
      password: password,
      confirmPassword: password
    })
    fixture.detectChanges()
    expect(component.registerForm.valid).toBeFalsy()
  })
  it('should not validate the form when the email field is empty', ()=>{
    const someUsername = ''
    const password = 'Aa1!zzz'

    component.registerForm.patchValue({
      userName: someUsername,
      password: password,
      confirmPassword: password
    })
    fixture.detectChanges()
    expect(component.registerForm.valid).toBeFalsy()
  })
  it('should not validate the form when the password field is empty', ()=>{
    const someUsername = 'testEmail123@gmail.com'
    const password = 'Aa1!zzz'

    component.registerForm.patchValue({
      userName: someUsername,
      password: '',
      confirmPassword: password
    })
    fixture.detectChanges()
    expect(component.registerForm.valid).toBeFalsy()
  })
  it('should not validate the form when the confirm password field is empty', ()=>{
    const someUsername = 'testEmail123@gmail.com'
    const password = 'Aa1!zzz'

    component.registerForm.patchValue({
      userName: someUsername,
      password: password,
      confirmPassword: ''
    })
    fixture.detectChanges()
    expect(component.registerForm.valid).toBeFalsy()
  })
  it('should return true when anim method is called and any of the form fields are full',()=>{
    component.registerForm.patchValue({
      userName:'123'
    })
    fixture.detectChanges()
    expect(component.anim()).toBeTrue()
  })
  it('should return true when anim method is called and all fields are empty',()=>{
    expect(component.anim()).toBeFalse()
  })
  // it('should change the property isValid to true if the form has been touched when validate method is called',()=>{

  // })
  it('should change the property hasUpper to true if there is an uppercase character in the password field when the logErrors method is called',()=>{
    component.registerForm.patchValue({
      password: 'A'
    })
    component.logErrors()
    fixture.detectChanges()
    expect(component.hasUpper).toBeTrue()
  })
  it('should change the property hasUpper to false if there is not an uppercase character in the password field when the logErrors method is called',()=>{
    component.registerForm.patchValue({
      password: 'a'
    })
    component.logErrors()

    fixture.detectChanges()
    expect(component.hasUpper).toBeFalse()
  })
  it('should change the property hasLower to true if there is a lowercase character in the password field when the logErrors method is called',()=>{
    component.registerForm.patchValue({
      password: 'a'
    })
    component.logErrors()

    fixture.detectChanges()
    expect(component.hasLower).toBeTrue()
  })
  it('should change the property hasLower to false if there is no lowercase characters in the password field when the logErrors method is called',()=>{
    component.registerForm.patchValue({
      password: 'A'
    })
    component.logErrors()

    fixture.detectChanges()
    expect(component.hasLower).toBeFalse()
  })
  it('should change the property hasNumber to true if there are numbers in the password field when the logErrors method is called',()=>{
    component.registerForm.patchValue({
      password: '123'
    })
    component.logErrors()

    fixture.detectChanges()
    expect(component.hasNumber).toBeTrue()
  })
  it('should change the property hasNumber to false if there are no numbers in the password field when the logErrors method is called',()=>{
    component.registerForm.patchValue({
      password: 'abc'
    })
    component.logErrors()

    fixture.detectChanges()
    expect(component.hasNumber).toBeFalse()
  })
  it('should change the property hasSpecial to true if there are special characters in the password field when the logErrors method is called',()=>{
    component.registerForm.patchValue({
      password: '!!!'
    })
    component.logErrors()

    fixture.detectChanges()
    expect(component.hasSpecial).toBeTrue()
  })
  it('should change the property hasSpecial to false if there are no special characters in the password field when the logErrors method is called',()=>{
    component.registerForm.patchValue({
      password: '111'
    })
    component.logErrors()

    fixture.detectChanges()
    expect(component.hasSpecial).toBeFalse()
  })
  it('should change the property isLongEnough to true if the password has 6 or more characters when the logErrors method is called',()=>{
    component.registerForm.patchValue({
      password: '123456'
    })
    component.logErrors()

    fixture.detectChanges()
    expect(component.isLongEnough).toBeTrue()
  })
  it('should change the property isLongEnough to false if the password is shorter than 6 characters when the logErrors method is called',()=>{
    component.registerForm.patchValue({
      password: '12345'
    })
    component.logErrors()

    fixture.detectChanges()
    expect(component.isLongEnough).toBeFalse()
  })
});
