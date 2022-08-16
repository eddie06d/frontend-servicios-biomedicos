import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL: string = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(this.API_URL);
  }

  getUserById(id: string) {
    return this.http.get(`${this.API_URL}/${id}`);
  }

}
