import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpSpy: jasmine.SpyObj<HttpClient>

  beforeEach( async () => {
    await TestBed.configureTestingModule({
        imports: [HttpClientModule],
        providers:[WeatherService]
    });
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    httpSpy = jasmine.createSpyObj('HttpClient', ['get'])
    service = new WeatherService(httpSpy)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send get request',()=>{
    httpSpy.get.and.returnValue(of({data: {current:'123'}}))
    console.log(123)
    service.callApi('111','111').subscribe({
        next: data =>{
        expect(data).not.toBeNull();
      }
    })
  })
});
