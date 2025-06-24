import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from './types/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiURL = 'http://localhost:3000/products';
  http = inject(HttpClient);

  getAll() {
    return this.http.get<Product[]>(this.apiURL);
  }

  getDetail(id: string) {
    return this.http.get<Product>(`${this.apiURL}/${id}`);
  }

  addProduct(data: any) {
    return this.http.post(this.apiURL, data);
  }

  editProduct(id: string, data: any) {
    return this.http.put(`${this.apiURL}/${id}`, data);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}
