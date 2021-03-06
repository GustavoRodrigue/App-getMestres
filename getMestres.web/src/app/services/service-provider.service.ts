import { Injectable } from '@angular/core';
import { BaseModel } from '../model/BaseModel';
import { BaseService } from '../base/base.service';
import { ServiceProviderModel } from '../model/serviceProviderModel';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceProviderService extends BaseService<ServiceProviderModel> {

  constructor(public http: HttpService) {
    super('serviceProvider', http);
  }
}
