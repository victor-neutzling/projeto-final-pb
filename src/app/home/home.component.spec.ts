
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
import { delay, map, observable, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocationService } from '../shared/location/location.service';
import { AuthService } from '../shared/services/auth/auth.service';
import { WeatherService } from '../shared/weather/weather.service';

import { HomeComponent } from './home.component';

let AuthServiceSpy: jasmine.SpyObj<AuthService>
let LocationServiceSpy: jasmine.SpyObj<LocationService>
let WeatherServiceSpy: jasmine.SpyObj<WeatherService>
let spyTimer: jasmine.Spy
let mockWindow = { location: { href: '' } };

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthService',['SignOut']);
    const spyLocation = jasmine.createSpyObj('LocationService',['getCurrentLocation','callApi']);
    const spyWeather = jasmine.createSpyObj('WeatherService',['callApi'])
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
        //{provide: LocationService, useClass: LocationService},
        {provide: LocationService, useValue: spyLocation},
        {provide: WeatherService, useValue: spyWeather},
        { provide: 'window', useValue: mockWindow },
        FormBuilder
      ],
    })
    .compileComponents();
    AuthServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>
    AuthServiceSpy.SignOut.and.returnValue(new Promise((res)=>{
      console.log(res)
    }))

    LocationServiceSpy = TestBed.inject(LocationService) as jasmine.SpyObj<LocationService>
    LocationServiceSpy.getCurrentLocation.and.returnValue(new Promise((res,rej)=>{

    }))
    LocationServiceSpy.callApi.and.returnValue(new Observable())

    WeatherServiceSpy = TestBed.inject(WeatherService) as jasmine.SpyObj<WeatherService>
    WeatherServiceSpy.callApi.and.returnValue(new Observable())
    jasmine.clock().install()
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterEach(()=>{
    jasmine.clock().uninstall()
  })

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

  it('should start the clock when ngOnInit is called',()=>{

    expect(component.intervalId).toBeTruthy()
  })
  it('should call getCurrentLocation from locationService when initiated',()=>{

    expect(LocationServiceSpy.getCurrentLocation).toHaveBeenCalled()
  })

  it('should call the method callApi from weatherService when method getWeather is called',()=>{
    component.getWeather('123','123')
    expect(WeatherServiceSpy.callApi).toHaveBeenCalled()
  })
  it('should call method signOut from AuthService when method logOut is called',()=>{
    component.logOut()
    expect(AuthServiceSpy.SignOut).toHaveBeenCalled()
  })

  it('should change the internal timer value to 60 when initiated',()=>{
    expect(component.internalTimer).toBe(60)
  })
  it('should change the value of time property when initiated',()=>{
    const previousValue = component.time;
    jasmine.clock().tick(1000);
    expect(component.time).not.toBe(previousValue)
  })
  it('should change the value of locale property to a default São Paulo - SP when location api does not reply',()=>{
    component.locale = 'undefined - undefined'
    jasmine.clock().tick(1000);
    expect(component.locale).toBe('São Paulo - SP')
  })
  it('should log the user out when the timer reaches 0',()=>{
    let spy = spyOn(component, 'logOut')

    jasmine.clock().tick(61000)
    expect(spy).toHaveBeenCalled()
    component.internalTimer = 60
  })
  // it('should navigate to google when gotoGoogle method is called',()=>{
  //   component.gotoGoogle();
  //   expect(window.location.href).toBe('https://www.google.com/')
  // })



});
