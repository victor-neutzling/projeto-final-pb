import { Router } from '@angular/router';
import { LocationService } from './../shared/location/location.service';
import { WeatherService } from './../shared/weather/weather.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { Day, Month } from '../shared/enums/date.enum'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public dayEnum = Day
  public monthEnum = Month

  rxTime = new Date();

  intervalId:any;
  intervalId2:any;

  localeArray:Array<string> = []
  time:any = '...'
  date = `${this.dayEnum[this.rxTime.getDay()]}, ${this.rxTime.getDate()} de ${this.monthEnum[this.rxTime.getMonth()]} de ${this.rxTime.getFullYear()}`
  locale = 'Carregando...'
  temperature = '...'
  internalTimer = 60 //in case someone inspects element and changes the timer, it would only affect the value and not change the time you can spend on the page
  timer = 60

  constructor(private router:Router,private locationService:LocationService,private weatherService:WeatherService) { }

  ngOnInit() {

    this.intervalId = setInterval(() => {
      let hours = (new Date()).getHours().toString()
      let mins = (new Date()).getMinutes().toString()
      if(hours.length == 1){
        hours = `0${hours}`
      }
      if(mins.length == 1){
        mins = `0${mins}`
      }
      if(this.locale == 'undefined - undefined'){
        this.locale = 'São Paulo - SP'
      }
      this.time = `${hours}:${mins}`

    }, 1000);

    this.locationService.getCurrentLocation().then((res:any)=>{
      console.log(res)
      this.locationService.callApi(res.coords.latitude,res.coords.longitude).subscribe((res:any)=>{

        this.locale = res[0].county + ' - ' + res[0].region_code

        this.getWeather(res[0].latitude,res[0].longitude);
      })
    }).catch((err:any) =>{
      this.locale = 'São Paulo - SP'
      this.getWeather('-23.5489','-46.6388');
    })

    this.startTimer()
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
    clearInterval(this.intervalId2);
  }
  startTimer(){
    this.intervalId = setInterval(() => {
      this.internalTimer--
      this.timer = this.internalTimer

      if(this.internalTimer == 0)
      this.router.navigate(['login'])

    }, 1000);

  }

  getWeather(lat:any,lng:any){
    this.weatherService.callApi(lat,lng).subscribe((res:any)=>{
      this.temperature = Math.round(res.temp)+'º'
    })
  }
  logout(){
    this.router.navigate(['login'])
  }
  gotoGoogle(){
    window.location.href = 'https://www.google.com/'
  }
}
