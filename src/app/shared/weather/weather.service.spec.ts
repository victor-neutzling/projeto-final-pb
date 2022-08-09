import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { WeatherService } from './weather.service';

describe('WeatherService', () => {
  let service: WeatherService;

  beforeEach( async () => {
    await TestBed.configureTestingModule({
        imports: [HttpClientModule],
        providers:[WeatherService]
    });
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return Observable object containing location when method callApi is called',()=>{
    expect(typeof(service.callApi('-23.5489','-46.6388'))).toBe('object')
  })
});
