import { Injectable } from '@angular/core';
import { CustomerModel } from '../model/customerModel';
import { BaseService } from '../base/base.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends BaseService<CustomerModel> {

  constructor(public http: HttpService) {
    super('customer', http);
  }

}