import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BaseService } from '../base/base.service';
import { CategoryModel } from '../model/CategoryModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService<CategoryModel>{

  constructor(public http: HttpService) {
    super('category', http);
  }

  public getAll(){
    this.http.get
  }
}
