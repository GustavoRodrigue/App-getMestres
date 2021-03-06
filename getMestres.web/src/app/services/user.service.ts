import { BaseService } from '../base/base.service';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { IResultHttp } from '../interfaces/IResultHttp';
import { environment } from 'src/environments/environment.prod';
import { Subject, Observable } from 'rxjs';
import { UserModel } from '../model/userModel';

@Injectable({
    providedIn: 'root'
})
export class UserService extends BaseService<UserModel>{

    private loginSubject = new Subject<boolean>();

    constructor(public http:HttpService) {
        super('users', http);
    }

    login(email: string, password: string): Promise<IResultHttp>{
        return this.http.post(`${environment.url_api}/users/auth`, { email, password});
    }
    configureLogin(o): void{
        const {token, user} = o.data;
        localStorage.setItem('getmestres:token', token);
        localStorage.setItem('getmestres:user', JSON.stringify(user));
        this.loginSubject.next(this.isStaticLogged);
    }

    get isLogged(): Observable<boolean>{
        return this.loginSubject.asObservable();
    }

    get isStaticLogged(): boolean {
        return !!localStorage.getItem('getmestres:token');
    }

    static get token(): string {
        return localStorage.getItem('getmestres:token');
    }
}