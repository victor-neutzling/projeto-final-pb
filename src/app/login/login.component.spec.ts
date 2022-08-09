import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from './../shared/services/auth/auth.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';

import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

let AuthServiceSpy: jasmine.SpyObj<AuthService>

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthService',['SignIn'])
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireDatabaseModule,
        RouterTestingModule,

      ],
      providers:[
        {provide: AuthService, useValue: spy},
        FormBuilder
      ],
      declarations: [ LoginComponent ],
    })
    .compileComponents();
    AuthServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>
    AuthServiceSpy.SignIn.and.returnValue(new Promise((res)=>{
      console.log(res)
    }))

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return true or false when method anim is called', () =>{
    expect(typeof(component.anim())).toBe('boolean')
  })

  it('should return true if username or password fields are full when anim method is called', ()=>{
    let someUsername = 'aaaaaa'
    let somePassword = 'aaaaaa'
    component.loginForm.patchValue({
      userName: someUsername,
      password: somePassword
    })
    fixture.detectChanges();
    expect(component.anim()).toBeTrue()

  })
  it('should return true if username or password fields are full when anim method is called', ()=>{

    component.loginForm.patchValue({
      userName: '',
      password: ''
    })
    fixture.detectChanges();
    expect(component.anim()).toBeFalse()
  })

  it('should change value of property isValid to true if the login form is valid and to false if not when method validate is called', () =>{
    let previousValue = component.isValid
    component.validate()
    fixture.detectChanges()
    if(component.loginForm.valid){
      expect(component.isValid).toBeFalsy()
    }else{
      expect(component.isValid).toBeTruthy()
    }
  })
  it('should not pass the form validation if any of the fields are empty',()=>{
    expect(component.loginForm.valid).toBeFalsy()
  })
  it('isFull should have default value of false',()=>{
    expect(component.isFull).toBe(false)
  })
  it('isValid should have default value of false',()=>{
    expect(component.isFull).toBe(false)
  })
  it('should call sign in method when onSubmit method is called if form is valid',()=>{

    const spy = spyOn(component, 'login');
    let someUsername = 'aaaaaa'
    let somePassword = 'aaaaaa'
    component.loginForm.patchValue({
      userName: someUsername,
      password: somePassword
    })
    fixture.detectChanges();
    component.onSubmit()
    expect(spy).toHaveBeenCalled();
  })
  it('should not call sign in method when onSubmit method is called if form is not valid',()=>{
    const spy = spyOn(component, 'login');
    let someUsername = ''
    let somePassword = ''
    component.loginForm.patchValue({
      userName: someUsername,
      password: somePassword
    })
    fixture.detectChanges();
    component.onSubmit()
    expect(spy).not.toHaveBeenCalled();
  })
});
