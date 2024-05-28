import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = 'https://note-sigma-black.vercel.app/api/v1/users/';
  userInfo = new BehaviorSubject(null);
  constructor(private _HttpClient: HttpClient, private _router: Router) {
    if (localStorage.getItem('userToken') !== null) {
      this.getProfile();
    } else {
      this._router.navigate(['/login']);
    }
    setTimeout(() => {
      this.logout();
    }, 300000);
  }

  getProfile() {
    let encode: any = localStorage.getItem('userToken');
    let decoded: any = jwtDecode(encode);
    this.userInfo.next(decoded);
  }

  signUp(registerData: any): Observable<any> {
    return this._HttpClient.post(this.baseUrl + 'signUp', registerData);
  }

  signIn(loginData: any): Observable<any> {
    return this._HttpClient.post(this.baseUrl + 'signIn', loginData);
  }

  logout() {
    localStorage.removeItem('userToken');
    this.userInfo.next(null);
    this._router.navigate(['/login']);
  }
}
