import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURL  = 'http://localhost:3000';
  http = inject(HttpClient);

  register(data: any) {
    return this.http.post(`${this.apiURL}/register`, data)
  }
  
  login(data: any) {
    return this.http.post(`${this.apiURL}/login`, data)
  }
  
}
