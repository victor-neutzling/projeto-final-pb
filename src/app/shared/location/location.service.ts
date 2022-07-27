import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apikey = 'b5846476df1478d322df84e6a0c1e7a0'
  constructor(private http:HttpClient) { }

  public getCurrentLocation(){
    return new Promise((res:any,rej:any)=>{
      navigator.geolocation.getCurrentPosition(res,rej)
    })

  }
  public callApi(lat:any,lng:any){
    return this.http.get(`http://api.positionstack.com/v1/reverse?access_key=${this.apikey}&query=${lat},${lng}`)
      .pipe(map((data: any) => data.data));
  }
}
