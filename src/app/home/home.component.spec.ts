
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { delay, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../shared/services/auth/auth.service';

import { HomeComponent } from './home.component';

let AuthServiceSpy: jasmine.SpyObj<AuthService>

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthService',['SignOut'])
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireDatabaseModule,
        RouterTestingModule,
        HttpClientModule
      ],
      providers:[{provide: AuthService, useValue: spy},
        {provide: LocationService, useClass: LocationService},
        FormBuilder
      ],
    })
    .compileComponents();
    AuthServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>
    AuthServiceSpy.SignOut.and.returnValue(new Promise((res)=>{
      console.log(res)
    }))

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('rxTime should receive a new Date object as standard value',()=>{
    expect(typeof(component.rxTime)).toBe('object')
  })
  it('dayEnum should receive an enum as standard value',()=>{
    expect(typeof(component.dayEnum)).toBe('object')
  })
  it('monthEnum should receive an enum as standard value',()=>{
    expect(typeof(component.monthEnum)).toBe('object')
  })
  it('time property should receive ... as standard value',()=>{
    expect(component.time).toBe('...')
  })
  it('date property should receive the current date retrieved from property rxTime as standard value',()=>{
    expect(component.date).toBe(`${component.dayEnum[component.rxTime.getDay()]}, ${component.rxTime.getDate()} de ${component.monthEnum[component.rxTime.getMonth()]} de ${component.rxTime.getFullYear()}`)
  })
  it('timer property should receive 60 as standard value',()=>{
    expect(component.timer).toBe(60)
  })
  it('internalTimer property should receive 60 as standard value',()=>{
    expect(component.internalTimer).toBe(60)
  })
  it('should start the timer and refresh the page once the timer runs out when method startTimer is called',async ()=>{
    component.startTimer(60)

    expect(component.intervalId).toBeTruthy();
  })
  it('should start the clock when ngOnInit is called',()=>{

    expect(component.intervalId).toBeTruthy()
  })



});



@Injectable({
  providedIn: 'root'
})
class LocationService {

  constructor() { }

  public getCurrentLocation(){
    return new Promise((res:any,rej:any)=>{

    })

  }
  public callApi(lat:any,lng:any){
    return new Observable()
  }

}
