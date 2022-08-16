import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_URL: string = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) { }

  register(user: any) {
    return this.http.post(`${this.API_URL}/signup`, user);
  }

  login(user: any) {
    return this.http.post(`${this.API_URL}/signin`, user);
  }

}
