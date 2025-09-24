import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Category } from '@shared/models/category.model';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);
  url = `${environment.apiUrl}`;

  getAll() {
    return this.http.get<Category[]>(`${this.url}/api/v1/categories`);
  }

  async getAllCategories(): Promise<Category[]> {
    const response = await fetch(`${this.url}/api/v1/categories`);
    const data = await response.json();
    return data;
  }
}
