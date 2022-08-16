import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonalDataService {
  API_URL: string = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  save(body: any, id: string) {
    return this.http.put(`${this.API_URL}/info_personal/${id}`, body);
  }

  get(id: string) {
    return this.http.get(`${this.API_URL}/info_personal/${id}`,);
  }

}
