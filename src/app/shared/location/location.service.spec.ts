import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';


import { LocationService } from './location.service';

describe('LocationService', () => {
  let service: LocationService;
  let httpSpy: jasmine.SpyObj<HttpClient>

  beforeEach( async () => {
    await TestBed.configureTestingModule({
        imports: [HttpClientModule],
        providers:[LocationService]
    });
  });
  beforeEach(() => {
    httpSpy = jasmine.createSpyObj('HttpClient',['get'])
    TestBed.configureTestingModule({});
    service = new LocationService(httpSpy)

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return coordinates when called and error when user denies geolocation',(done)=>{
    service.getCurrentLocation().then((res:any)=>{
      //console.log(res)
      expect(res.coords).toBeTruthy()
      done();
    }).catch((err:any)=>{
      expect(err.message).toBe("User denied Geolocation")
      done();
    })
  })

  it('should return observable when calling api',()=>{
    httpSpy.get.and.returnValue(of({data: {current:'123'}}))
    console.log(123)
    service.callApi('111','111').subscribe({
        next: data =>{
        expect(data).not.toBeNull();
        }
      })
    })


});
