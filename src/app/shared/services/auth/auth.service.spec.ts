import { AnimationDriver } from '@angular/animations/browser';
import { CommonModule } from '@angular/common';
import { fakeAsync, TestBed, tick, ComponentFixture } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ɵassignExtraOptionsToRouter } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UserCredential } from 'firebase/auth';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

import { RegisterComponent } from 'src/app/register/register.component';
import { environment } from 'src/environments/environment';

import { AuthService } from './auth.service';
import { authState } from '@angular/fire/auth'



describe('AuthService', () => {
  let service: AuthService;
  let afAuth: AngularFireAuth;

  beforeEach(async()=>{
    const mockAngularFireAuth: any = {
      auth: jasmine.createSpyObj('auth', {
         'signOut': Promise.reject(),
         'signInWithEmailAndPassword': Promise.reject(),
         'createUserWithEmailAndPassword': Promise.reject()
      }),
      authState: of(authState)
    };

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
        { provide: AngularFireAuth, useValue: mockAngularFireAuth },
        { provide: AuthService, useClass: AuthService }
      ],
    })
  })
  beforeEach(()=>{

  })


  it('should be created', () => {
    expect(AuthService).toBeTruthy();
  });
  it('should do something',()=>{

  })
});
