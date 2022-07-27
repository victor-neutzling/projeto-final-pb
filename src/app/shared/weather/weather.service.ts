import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apikey = '186a2e7cb154877d694dd8533473e44e'
  constructor(private http:HttpClient) { }

  public callApi(lat:any,lng:any){
    return this.http.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=${this.apikey}&exclude=minutely,hourly,daily,alerts&units=metric`)
      .pipe(map((data: any) => data.current));
  }
}
