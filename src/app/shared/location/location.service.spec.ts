import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { delay } from 'rxjs';

import { LocationService } from './location.service';

describe('LocationService', () => {


  let service: LocationService;
  beforeEach( async () => {
    await TestBed.configureTestingModule({
        imports: [HttpClientModule],
        providers:[LocationService]
    });
  });
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  // it("should have 'b5846476df1478d322df84e6a0c1e7a0' as apiKey", ()=>{
  //   expect(service.apiKey())
  // })
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

  it('should return Observable object containing location when method callApi is called',()=>{
    expect(typeof(service.callApi('-23.5489','-46.6388'))).toBe('object')
  })

});
