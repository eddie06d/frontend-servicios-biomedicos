import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DniService {
  token: string = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImVqaHVhbmNhaHVpcmVAZ21haWwuY29tIn0.0IiYNNlwsITnvoAtt0DTBZyf5T7zGgIGAhIEjt_QqXY';
  API_URL: string = 'https://dniruc.apisperu.com/api/v1/dni';

  constructor(private http: HttpClient) { }

  checkDni(dni: string) {
    return this.http.get(`${this.API_URL}/${dni}?token=${this.token}`);
  }

}
