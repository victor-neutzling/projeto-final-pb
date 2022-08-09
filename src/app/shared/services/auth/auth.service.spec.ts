import { CommonModule } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { RegisterComponent } from 'src/app/register/register.component';
import { environment } from 'src/environments/environment';

import { AuthService } from './auth.service';

let AuthServiceSpy: jasmine.SpyObj<AuthService>

describe('AuthService', () => {
  let service: AuthService;
  beforeEach(async()=>{
    const spy = jasmine.createSpyObj('AuthService',['SignIn','SignUp','SignOut'])
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
      providers:[
        {provide: AuthService, useValue: spy},


      ],
    })
  })

  beforeEach(() => {

    //TestBed.configureTestingModule({});
    AuthServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>
    AuthServiceSpy.SignIn.and.returnValue(new Promise<void>((res)=>{
      return 'signed in'
    }))
    AuthServiceSpy.SignUp.and.returnValue(new Promise<void>((res)=>{
      return 'signed up'
    }))
    AuthServiceSpy.SignOut.and.returnValue(new Promise<void>((res)=>{
      return 'signed out'
    }))
    //service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(AuthServiceSpy).toBeTruthy();
    //console.log(typeof(service.SignIn('aaa@gmail.com','123123')))
  });
  it('should return object when signIn is called', () =>{
    expect(typeof(AuthServiceSpy.SignIn('aaa@gmail.com','123123'))).toBe('object')
  })
  it('should return object when signUp is called', () =>{
    expect(typeof(AuthServiceSpy.SignUp('aaa@gmail.com','123123'))).toBe('object')
  })
  it('should return object when signOut is called', () =>{
    expect(typeof(AuthServiceSpy.SignOut())).toBe('object')
  })
});
