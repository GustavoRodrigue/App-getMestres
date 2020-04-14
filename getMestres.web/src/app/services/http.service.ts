import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IResultHttp } from '../interfaces/IResultHttp';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService) {

  }

  private createHeader(header?: HttpHeaders): HttpHeaders {
    
    if(!header){
      header = new HttpHeaders();
    }

    header = header.append('Content-Type', 'application/json');
    header = header.append('accept', 'application/json');
    
    const token = localStorage.getItem('getmestres:token');
    if (token){
      header = header.append('x-token-access', token);
    }

    return header;
  }


  public get(url: string): Promise<IResultHttp>{
    const header = this.createHeader();
    return new Promise(async (resolve)=>{
      try {
        this.spinner.show();
        const res = await this.http.get(url, { headers: header}).toPromise();
        resolve({ success: true, data: res, error: undefined});
        this.spinner.hide();
      } catch (error) {
        this.spinner.hide();
        resolve({ success: false, data: {}, error});
      }
    });
  }
  public post(url: string, model: any): Promise<IResultHttp>{
    const header = this.createHeader();
    return new Promise(async (resolve)=>{
      try {
        this.spinner.show();
        const res = await this.http.post(url, model, {headers: header}).toPromise();
        resolve({ success: true, data: res, error: undefined});
        this.spinner.hide();
      } catch (error) {
        this.spinner.hide();
        if(error.status ===400){
          let errosText = '<ul>';
          if(Array.isArray(error.error)){
            error.error.forEach(element => {
              errosText += `<li style="text-align: left">${element.message || element}</li>`;
            });
            errosText += '</ul>';
            Swal.fire('Atenção', errosText, 'warning');
          }
        }
        resolve({ success: false, data: {}, error})
      }
    });
  }
  public delete(url: string): Promise<IResultHttp>{
    const header = this.createHeader();
    return new Promise(async (resolve)=>{
      try {
        this.spinner.show();
        const res = await this.http.delete(url, {headers: header}).toPromise();
        resolve({ success: true, data: res, error: undefined});
        this.spinner.hide();
      } catch (error) {
        this.spinner.hide();
        resolve({ success: false, data: {}, error})
      }
    });
  }
}
